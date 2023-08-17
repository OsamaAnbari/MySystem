import { messages_api } from '../../config';
//import { studentVal } from '../../validation/student_val'

import { useEffect, useState } from "react";

import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import '../../styles/messages.css'

const PopupNew = ({clrShow}) => {
    const [newMessage, setnewMessage] = useState({receiver_id:'', sender_id:sessionStorage.id, sender_name:sessionStorage.name, date:''})
    const [valError, setValError] = useState({})
    const [receivers, setReceivers] = useState([])

    const [editorState, onEditorStateChange] = useState(EditorState.createEmpty())

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`${messages_api}/receviers`, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: "include"
        })
        .then(res => res.json())
        .then(
            (result)=> {
                setReceivers([])
                result.forEach(element => {
                    setReceivers(receivers => [...receivers, {value:element._id, label:element.name}])
                });
            }
        )
        .catch(err => {
            alert('Server error, please try again later')
            console.log(err)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handle(e) {
        e.preventDefault()

        const error = {} //studentVal(newMessage)
        const msg = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        
        if(Object.keys(error).length === 0){
            fetch(messages_api, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({...newMessage, content : msg})
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                clrShow()
            })
            .catch(err => {
                alert('Server error, please try again later')
                console.log(err)
            })
        }else{
            setValError(error)
        }
    }

    return(
        <div className="popup my-border" >
            <div className="popup-header">
                <div style={{"width":" 95%"}}><b style={{"marginLeft":"5%"}}>Send New Message</b></div>
                <div style={{"width":" 5%"}}><button id="close-button" onClick={clrShow}>X</button></div>
            </div>
            <Form onSubmit={handle}>
            <div className="popup-content" style={{width:"100"}}>
                <div style={{width:"100"}}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Receiver</InputGroup.Text>
                        <Select options={receivers}
                        onChange={(e) => {
                            setnewMessage(newMessage => ({...newMessage, ...{receiver_id : e.value}}))
                        }}
                        />
                    </InputGroup>
                    <div style={{marginTop:"0px"}} className="error-field">
                        {valError.subject}
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Subject</InputGroup.Text>
                        <Form.Control placeholder="Subject" value={newMessage.subject} onChange={(e) => {setnewMessage(newMessage => ({...newMessage, ...{subject : e.target.value}}))}}  />
                    </InputGroup>
                    <div className="popup-content-div" id="error-field">
                        {valError.content}
                    </div>
                    {/*<FloatingLabel controlId="floatingTextarea2" label="Message">
                        <Form.Control
                        as="textarea"
                        placeholder="Please write your message here"
                        style={{ height: '100px' }}
                        value={newMessage.content}
                        onChange={(e) => {setnewMessage(newMessage => ({...newMessage, ...{content : e.target.value}}))}}
                        />
                    </FloatingLabel>*/}
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                    <div className="popup-content-div">
                        <button className="btn btn-blu" id="confirm-button" type="submit">Send</button>
                    </div>
                </div>
            </div>
            </Form>
        </div>
    )
}

function Row({ setMessage, data, refresh, setRefresh, setMsg }){

    function setRead(e){
        e.preventDefault()
        
        fetch(`${messages_api}/${data._id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({read : true})
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setRefresh(!refresh)
        })
    }

    return(
        <div className="messages-menu-row" style={!data.read ? {"fontWeight" : "bold"} : {}} onClick={(e) => {
            setMessage(data)
            const date = new Date(Number(data.date))
            setMessage(data => ({...data, date : `${date}`}))
            try{
                setMsg(EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))))
            } catch(err) {
                setMsg(EditorState.createWithContent(convertFromRaw({"blocks":[{"key":"e7ppl","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}})))
            }
            setRead(e)
            }}>
            <div className="user-row-texts">
                <div className="message-sendername">{data.sender_name}</div>
                <div className="message-subject">{data.subject}</div>
            </div>
        </div>
    )
}

function MessagesData ({page, setPagenum, setMessage, setMsg, setRefresh, refresh}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
        document.title = "Students List"
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(messages_api, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: "include"
        })
        .then(res => res.json())
        .then(
            (result)=> {
                result.sort((a, b) => {
                    if(a.date > b.date) {return -1};
                    if(a.date < b.date) {return 1};
                    return 0;
                })
                setIsLoaded(true)
                setItems(result)
                setPagenum(result.length)
            }
        )
        .catch(err => {
            setIsLoaded(true)
            alert('Server error, please try again later')
            console.log(err)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])

    if (items.error) {
        return <div>Error: {items.error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const itemss = items.slice(page*10-10, page*10)
        return (
            <ul>
            {
                itemss.map((item, index) => (
                    <li key={index}>
                        <Row data={item} setMessage={setMessage} setRefresh={setRefresh} refresh={refresh} setMsg={setMsg}/>
                    </li>
                ))
            }
            </ul>
        );
    }
}

function Messages ({blur, setBlur}) {
    const [show, setShow] = useState(false)
    const [page, setPage] = useState(1)
    const [pagenum, setPagenum] = useState(0)
    const [message, setMessage] = useState({})
    const [msg, setMsg] = useState()
    const [refresh, setRefresh] = useState(false)

    const clrShow = () => {
        setShow(false)
        setBlur(false)
    }

    function nextPage() {
        if(pagenum/10 > page)
            setPage(page+1) 
    }
    function prvsPage() {
        if (page > 1)
            setPage(page-1)
    }

    function deleteMsg(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(`${messages_api}/${message._id}`, {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
            credentials: "include"
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setMessage({})
            setRefresh(!refresh)
        })
        .catch(err => {
            alert('Server error, please try again later')
            console.log(err)
        })
    }

    return(
        <>
        {show && blur && <PopupNew clrShow={clrShow} />}
        <div className="main-employees row">
            <div className="col-sm-4" style={{borderRightStyle:'solid', borderWidth:'0.5px'}}>
                <div className="messages-menu-header">
                    <div className="messages-menu-header-texts">
                        <div className="message-sendername">Sender</div>
                        <div className="message-subject">Subject</div>
                    </div>
                </div>
                <div className="messages-menu-body">
                    <div id="messages-menu-body">

                        <MessagesData page={page} setPagenum={setPagenum} setMessage={setMessage} setMsg={setMsg} refresh={refresh} setRefresh={setRefresh} />

                    </div>
                    <div className="messages-menu-body-foter">
                        <button className="btn btn-blu" id="prvs-btn" onClick={prvsPage}>{"<"}</button>
                        <div id="page-num">{page}</div>
                        <button className="btn btn-blu" id="nxt-btn" onClick={nextPage}>{">"}</button>
                    </div>
                </div>
            </div>
            <div className="col-sm-8">
                <div className="messages-menu-header">
                    <div className="messages-menu-header-texts" style={{justifyContent:"space-between"}}>
                        <Button onClick={(e) => {
                        setShow(true)
                        setBlur(true)
                        }}>New Message</Button>
                        <Button variant='danger' onClick={deleteMsg}>Delete</Button>
                    </div>
                </div>
                <div className="messages-menu-row" style={{"borderTopWidth":"0.5px"}}>
                    <div><b>Sender : </b></div>
                    <div>{message.sender_name}</div>
                </div>
                <div className="messages-menu-row">
                    <div><b>Subject : </b></div>
                    <div>{message.subject}</div>
                </div>
                <div className="messages-menu-row">
                    <div><b>Date : </b></div>
                    <div>{message.date}</div>
                </div>
                <div style={{"borderStyle":"none"}}>
                    <Editor
                        editorState={msg}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default Messages