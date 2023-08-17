import '../../styles/activitieslist.css'
import '../../styles/popup.css'

import { activities_api } from '../../config';
import { activityVal } from '../../validation/activity_val'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from "react";

const PopupNew = ({clrShow}) => {
    const [newData, setNewData] = useState({name:'', teacher:'', date:'', time:''})
    const [valError, setValError] = useState({})

    async function handle(e) {
        e.preventDefault()

        const error = activityVal(newData)
        
        if(Object.keys(error).length === 0){
            fetch(activities_api, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(newData)
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
        <div className="popup my-border">
            <div className="popup-header">
                <div style={{"width":" 95%"}}><b style={{"marginLeft":"5%"}}>Add New User</b></div>
                <div style={{"width":" 5%"}} onClick={clrShow}><b>X</b></div>
            </div>
            <Form className="popup-content"  onSubmit={handle}>
                <div className="popup-content-col1">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Name</InputGroup.Text>
                        <Form.Control
                        placeholder="Name"
                        value={newData.name}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{name : e.target.value}}))}}
                        isInvalid={!!valError.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.name}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Teacher</InputGroup.Text>
                        <Form.Control
                        placeholder="Teacher"
                        value={newData.teacher}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{teacher : e.target.value}}))}}
                        isInvalid={!!valError.teacher}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.teacher}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Date</InputGroup.Text>
                        <Form.Control
                        type='date'
                        placeholder="Date"
                        value={newData.date}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{date : e.target.value}}))}}
                        isInvalid={!!valError.date}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.date}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Time</InputGroup.Text>
                        <Form.Control
                        type='time'
                        placeholder="Time"
                        value={newData.time}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{time : e.target.value}}))}}
                        isInvalid={!!valError.time}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.time}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Button variant="success" type="submit">Add</Button>
                    </InputGroup>
                </div>
            </Form>
        </div>
    )
}

const PopupShow = ({data,  clrShow, showEdt}) => {
    return(
        <div className="popup my-border">
            <div className="popup-header">
                <div style={{"width":" 95%"}}><b style={{"marginLeft":"5%"}}>Add New User</b></div>
                <div style={{"width":" 5%"}} onClick={clrShow}><b>X</b></div>
            </div>
            <Form className="popup-content">
                <div className="popup-content-col1">
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Name</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.name}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Teacher</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.teacher}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Date</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.date}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Time</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.time}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <Button variant='primary'
                            onClick={(e) => {
                                clrShow()
                                showEdt()
                            }}>Edit</Button>
                    </InputGroup>
                </div>
            </Form>
        </div>
    )
}

const PopupEdt = ({data,  clrShow}) => {
    const [newData, setNewData] = useState({name:data.name, teacher:data.teacher, date:data.date, time:data.time})
    const [valError, setValError] = useState({})

    async function handle(e) {
        e.preventDefault()
        
        const date = new Date(`${newData.date} ${newData.time}`)
        setNewData({...newData, date : date})
        const error = activityVal(newData)
        
        if(Object.keys(error).length === 0){
            fetch(`${activities_api}/${data._id}`, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(newData)
            })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                clrShow()
            })
        }else{
            setValError(error)
            console.log(error)
        }
    }

    async function handleDel(e) {
        e.preventDefault()

        fetch(`${activities_api}/${data._id}`, {
            method: 'Delete',
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            clrShow()
        })
    }

    return(
        <div className="popup my-border">
            <div className="popup-header">
                <div style={{"width":" 95%"}}><b style={{"marginLeft":"5%"}}>Add New User</b></div>
                <div style={{"width":" 5%"}} onClick={clrShow}><b>X</b></div>
            </div>
            <Form className="popup-content"  onSubmit={handle}>
                <div className="popup-content-col1">
                    <div style={{marginTop:"0px"}} className="error-field">
                        {valError.tc}
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Name</InputGroup.Text>
                        <Form.Control placeholder="Name" value={newData.name} onChange={(e) => {setNewData(newData => ({...newData, ...{name : e.target.value}}))}}  />
                        <Form.Control.Feedback type="invalid">
                            {valError.name}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Teacher</InputGroup.Text>
                        <Form.Control placeholder="TC" value={newData.teacher} onChange={(e) => {setNewData(newData => ({...newData, ...{teacher : e.target.value}}))}}  />
                        <Form.Control.Feedback type="invalid">
                            {valError.teacher}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Date</InputGroup.Text>
                        <Form.Control type='date' placeholder="Surname" value={newData.date} onChange={(e) => {setNewData(newData => ({...newData, ...{date : e.target.value}}))}}  />
                        <Form.Control.Feedback type="invalid">
                            {valError.date}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Time</InputGroup.Text>
                        <Form.Control type='time' placeholder="Department" value={newData.time} onChange={(e) => {setNewData(newData => ({...newData, ...{time : e.target.value}}))}}  />
                        <Form.Control.Feedback type="invalid">
                            {valError.time}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Button variant="success" type="submit">Modify</Button>
                        <Button variant="danger" onClick={handleDel}>Delete</Button>
                    </InputGroup>
                </div>
            </Form>
        </div>
    )
}

function Row({ showDet, setData, data}){
    function showPopupShow(){
        showDet(true)
        setData(data)
    }

    return(
        <div className="users-menu-row">
            <div className="user-row-texts">
                <div className="user-title">{data.name}</div>
                <div className="user-teacher">{data.teacher}</div>
                <div className="user-date">{data.date}</div>
                <div className="user-time">{data.time}</div>
            </div>
            <div className="user-row-buttons">
                <Button variant="outline-warning" onClick={showPopupShow} >Details</Button>
            </div>
        </div>
    )
}

function RowUser({ data }){

    return(
        <div className="users-menu-row">
            <div className="user-row-texts">
                <div className="user-name">{data.name}</div>
                <div className="user-teacher">{data.teacher}</div>
                <div className="user-date">{data.date}</div>
                <div className="user-time">{data.time}</div>
            </div>
        </div>
    )
}

function ActivityData({showDet, setData, page, refresh, setPagenum, isLoaded, setIsLoaded, itemsOld, setItemsOld, itemsNew, setItemsNew}) {
    

    if (itemsOld.error) {
        return <div>Error: {itemsOld.error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const itemss = itemsOld.slice(page*10-10, page*10)
        return (
            <ul>
            {
                itemss.map((item, index) => (
                    <li key={index}>
                        {sessionStorage.getItem('role')==='admin' && <Row setData={setData} showDet={showDet} data={item} />}
                        {sessionStorage.getItem('role')==='student' && <RowUser setData={setData} showDet={showDet} data={item} />}
                    </li>
                ))
            }
            </ul>
        );
    }
}

function Cards({element, role, setData, showDet}) {
    return(
        <div className="card" style={{width:'100%', marginTop:'20px'}}>
            <div className='card-content'>
                <div className='card-title'>{element.name}</div>
                <div className='card-txts'>
                    <div>
                        <div style={{marginTop:"4px"}}><b>Teacher : </b>{element.teacher}</div>
                        <div style={{marginTop:"4px"}}><b>Date : </b>{element.date}</div>
                        <div style={{marginTop:"4px"}}><b>Time : </b>{element.time}</div>
                    </div>
                    <div>
                        {
                            (role==='admin') && <Button variant="outline-warning" onClick={e => {
                                setData(element)
                                showDet()
                            }} >Details</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function Activities ({blur, setBlur}) {
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const clrShow = () => {
        setShow1(false)
        setShow2(false)
        setShow3(false)
        setBlur(false)
        setRefresh(!refresh)
    }
    const showNew = () => {
        setBlur(true)
        setShow2(true)
    }
    const showDet = () => {
        setBlur(true)
        setShow1(true)
    }
    const showEdt = () => {
        setBlur(true)
        setShow3(true)
    }
    useEffect(() => {
        if(!blur){
            clrShow()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blur])

    const [dataa, setData] = useState({})
    const [page, setPage] = useState(1)
    const [pagenum, setPagenum] = useState(0)

    function nextPage() {
        if(pagenum/10 > page)
            setPage(page+1) 
    }
    function prvsPage() {
        if (page > 1)
            setPage(page-1)
    }

    const [isLoaded, setIsLoaded] = useState(false);
    const [itemsOld, setItemsOld] = useState([]);
    const [itemsNew, setItemsNew] = useState([]);
  
    useEffect(() => {
        document.title = "Students List"
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(activities_api, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: "include"
        })
        .then(res => res.json())
        .then(
            (result)=> {
                setItemsOld([])
                setItemsNew([])

                result.sort(function(a, b){
                    if(new Date(`${a.date} ${a.time}`) > new Date(`${b.date} ${b.time}`)) { return -1; }
                    if(new Date(`${a.date} ${a.time}`) < new Date(`${b.date} ${b.time}`)) { return 1; }
                    return 0;
                })

                result.forEach(element => {
                    if(new Date(`${element.date} ${element.time}`) < new Date()){
                        setItemsOld(itemsOld => [...itemsOld, element])
                    } else {
                        setItemsNew(itemsNew => [...itemsNew, element])
                    }
                });

                setIsLoaded(true)
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

    return(
        <div>
            {
                (show1 && blur && <PopupShow data={dataa}  clrShow={clrShow} showEdt={showEdt} />) ||
                (show2 && blur && <PopupNew clrShow={clrShow} />) ||
                (show3 && blur && <PopupEdt clrShow={clrShow} data={dataa} />)
            }
            <div className="main-employees row">
                <div className="col-sm-5" style={{paddingRight:'30px'}}>
                    {
                        itemsNew.map(element => (
                            <Cards
                            element={element}
                            setData={setData}
                            showDet={showDet}
                            role={sessionStorage.getItem('role')}
                            />
                        ))
                    }
                </div>
                <div className="col-sm-7">
                    <div className="users-menu-header">
                        <div className="users-menu-header-texts">
                            <div className="user-title">Title</div>
                            <div className="user-teacher">Teacher</div>
                            <div className="user-date">Date</div>
                            <div className="user-time">Time</div>
                        </div>
                        <div className="users-menu-header-buttons">
                            {sessionStorage.getItem('role')==='admin' && <button className="btn btn-blu" id="add-user" onClick={showNew}>Add</button>}
                        </div>
                    </div>
                    <div className="users-menu-body">
                        <div id="users-menu-body">
                            
                            <ActivityData
                            setData={setData}
                            showDet={showDet}
                            page={page}
                            refresh={refresh}
                            setPagenum={setPagenum}
                            isLoaded={isLoaded}
                            setIsLoaded={setIsLoaded}
                            itemsOld={itemsOld}
                            setItemsOld={setItemsOld}
                            itemsNew={itemsNew}
                            setItemsNew={setItemsNew}
                            />
                            
                        </div>
                        <div className="users-menu-body-foter">
                            <button className="btn btn-blu" id="prvs-btn" onClick={prvsPage}>{"<"}</button>
                            <div id="page-num">{page}</div>
                            <button className="btn btn-blu" id="nxt-btn" onClick={nextPage}>{">"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activities