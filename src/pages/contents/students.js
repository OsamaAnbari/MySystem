import '../../styles/studentslist.css'
import '../../styles/popup.css'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { students_api, image_api } from '../../config';
import { studentVal } from '../../validation/student_val'

import { useEffect, useState } from "react";

import altimg from '../../imgs/personal.png'
import loadingimg from '../../imgs/loading.gif'

function change_img(e, setPreview) {
    const file = e.target.files[0];
    setPreview(file)
}

async function set_img(preview) {

    let form = new FormData()
    form.append("image", preview)

    let url

    if(preview){
        await fetch(image_api, {
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            body: form
        })
        .then(res => res.json())
        .then(res => {
            url = res.data.url
            console.log(url)
        })
    }else{
        url = ''
    }

    return url
}

const PopupNew = ({clrShow}) => {
    const [newData, setNewData] = useState({tc:'', name:'', surname:'', department:'', mobile:'', email:'', image:''})
    const [preview, setPreview] = useState()
    const [valError, setValError] = useState({})

    async function handle(e) {
        e.preventDefault()

        const error = studentVal(newData)

        const img = await set_img(preview)
        
        if(Object.keys(error).length === 0){
            fetch(students_api, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({...newData, image : img})
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
                        <InputGroup.Text id="basic-addon2">TC</InputGroup.Text>
                        <Form.Control
                        placeholder="TC"
                        value={newData.tc}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{tc : e.target.value}}))}}
                        isInvalid={!!valError.tc}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.tc}
                        </Form.Control.Feedback>
                    </InputGroup>
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
                        <InputGroup.Text id="basic-addon2">Surname</InputGroup.Text>
                        <Form.Control
                        placeholder="Surname"
                        value={newData.surname}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{surname : e.target.value}}))}}
                        isInvalid={!!valError.surname}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.surname}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Department</InputGroup.Text>
                        <Form.Control
                        placeholder="Department"
                        value={newData.department}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{department : e.target.value}}))}}
                        isInvalid={!!valError.department}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.department}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Mobile</InputGroup.Text>
                        <Form.Control
                        placeholder="Mobile"
                        value={newData.mobile}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{mobile : e.target.value}}))}}
                        isInvalid={!!valError.mobile}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.mobile}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
                        <Form.Control
                        placeholder="Email"
                        value={newData.email}
                        onChange={(e) => {setNewData(newData => ({...newData, ...{email : e.target.value}}))}}
                        isInvalid={!!valError.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {valError.email}
                        </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Button variant="success" type="submit">Add</Button>
                    </InputGroup>
                </div>
                <div className="popup-content-col2">
                    <div className="popup-content-div">
                        <img alt="Not found" src={preview ? URL.createObjectURL(preview) : altimg} className="my-border personal-img" id="personal-img" width="200px" height="200px" />
                    </div>
                    <div className="popup-content-div">
                        <label className="btn btn-ylo">
                            <input type="file" style={{"display":"None"}} 
                            id="input_img" accept="image/*" onChange={(e) => change_img(e, setPreview)} /><span>Upload Image</span>
                        </label>
                    </div>
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
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">TC</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.tc}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Name</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.name}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Surname</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.surname}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Department</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.department}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Mobile</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.mobile}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Email</InputGroup.Text>
                        <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{data.email}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup>
                        <Button variant='primary'
                            onClick={(e) => {
                                clrShow()
                                showEdt()
                            }}>Edit</Button>
                    </InputGroup>
                </div>
                <div className="popup-content-col2">
                    <div className="popup-content-div">
                        <img alt="Not found" src={data.image ? data.image : altimg} className="my-border personal-img" id="personal-img" width="200px" height="200px" />
                    </div>
                </div>
            </Form>
        </div>
    )
}

const PopupEdt = ({data,  clrShow}) => {
    const [newData, setNewData] = useState({tc:data.tc, name:data.name, surname:data.surname, department:data.department, mobile:data.mobile, email:data.email, image:data.image})
    const [preview, setPreview] = useState()
    const [imgChng, setImgChng] = useState(false)
    const [valError, setValError] = useState({})

    async function handle(e) {
        e.preventDefault()
        
        const error = studentVal(newData)

        let img
        if(imgChng){
            img = await set_img(preview)
        }else{
            img = data.image
        }

        
        if(Object.keys(error).length === 0){
            fetch(`${students_api}/${data._id}`, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({...newData, image : img})
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

        fetch(`${students_api}/${data._id}`, {
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
                        <InputGroup.Text id="basic-addon2">TC</InputGroup.Text>
                        <Form.Control placeholder="TC" value={newData.tc} onChange={(e) => {setNewData(newData => ({...newData, ...{tc : e.target.value}}))}}  />
                    </InputGroup>
                    <div style={{marginTop:"0px"}} className="error-field">
                        {valError.name}
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Name</InputGroup.Text>
                        <Form.Control placeholder="Name" value={newData.name} onChange={(e) => {setNewData(newData => ({...newData, ...{name : e.target.value}}))}}  />
                    </InputGroup>
                    <div style={{marginTop:"0px"}} className="error-field">
                        {valError.surname}
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Surname</InputGroup.Text>
                        <Form.Control placeholder="Surname" value={newData.surname} onChange={(e) => {setNewData(newData => ({...newData, ...{surname : e.target.value}}))}}  />
                    </InputGroup>
                    <div style={{marginTop:"0px"}} className="error-field">
                        {valError.department}
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Department</InputGroup.Text>
                        <Form.Control placeholder="Department" value={newData.department} onChange={(e) => {setNewData(newData => ({...newData, ...{department : e.target.value}}))}}  />
                    </InputGroup>
                    <div style={{marginTop:"0px"}} className="error-field">
                        {valError.mobile}
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Mobile</InputGroup.Text>
                        <Form.Control placeholder="Mobile" value={newData.mobile} onChange={(e) => {setNewData(newData => ({...newData, ...{mobile : e.target.value}}))}}  />
                    </InputGroup>
                    <div style={{marginTop:"0px"}} className="error-field">
                        {valError.email}
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
                        <Form.Control placeholder="Email" value={newData.email} onChange={(e) => {setNewData(newData => ({...newData, ...{email : e.target.value}}))}}  />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Button variant="success" type="submit">Modify</Button>
                        <Button variant="danger" onClick={handleDel}>Delete</Button>
                    </InputGroup>
                </div>
                <div className="popup-content-col2">
                    <div className="popup-content-div">
                        <img alt="Not found" src={preview ? URL.createObjectURL(preview) : altimg} className="my-border personal-img" id="personal-img" width="200px" height="200px" />
                    </div>
                    <div className="popup-content-div">
                    <label className="btn btn-ylo">
                            <input type="file" style={{"display":"None"}} 
                            id="input_img" accept="image/*" onChange={(e) => {
                                change_img(e, setPreview)
                                setImgChng(true)
                                }} /><span>Change Image</span>
                        </label>
                    </div>
                </div>
            </Form>
        </div>
    )
}

function Row({
    showDet,
    setData,
    data
}){
    function showPopupShow(){
        showDet(true)
        setData(data)
    }

    return(
        <div className="users-menu-row">
            <div className="user-row-texts">
                <div className="user-photo"><img alt="Not found" className="personal-img-sml" src={data.image ? data.image : altimg} width="34px" height="34px" /></div>
                <div className="user-tc">{data.tc}</div>
                <div className="user-name">{data.name}</div>
                <div className="user-surname">{data.surname}</div>
                <div className="user-department">{data.department}</div>
                <div className="user-number">{data.mobile}</div>
            </div>
            <div className="user-row-buttons">
                <Button variant="outline-warning" onClick={showPopupShow}>Details</Button>
            </div>
        </div>
    )
}

function StudentsData({showDet, setData, page, refresh, setPagenum}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
        document.title = "Students List"
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(students_api, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: "include"
        })
        .then(res => res.json())
        .then(
            (result)=> {
                result.sort(function(a, b){
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
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
        return <div><img alt="Not found" src={loadingimg} width="20px" /><div>Loading</div></div>
    } else {
        const itemss = items.slice(page*10-10, page*10)
        return (
            <ul>
            {
                itemss.map((item, index) => (
                    <li key={index}>
                        <Row setData={setData} showDet={showDet} data={item} />
                    </li>
                ))
            }
            </ul>
        );
    }
}

const Students = ({blur, setBlur}) => {
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

    return(
        <div>
            {
                (show1 && blur && <PopupShow data={dataa}  clrShow={clrShow} showEdt={showEdt} />) ||
                (show2 && blur && <PopupNew clrShow={clrShow} />) ||
                (show3 && blur && <PopupEdt clrShow={clrShow} data={dataa} />)
            }
            <div className="main-employees">
                <div className="users-menu">
                    <div className="users-menu-header">
                        <div className="users-menu-header-texts">
                            <div className="user-photo">Photo</div>
                            <div className="user-tc">TC</div>
                            <div className="user-name">Name</div>
                            <div className="user-surname">Surname</div>
                            <div className="user-department">Department</div>
                            <div className="user-number">Phone Number</div>
                        </div>
                        <div className="users-menu-header-buttons">
                            {/*<button className="btn btn-blu" id="add-user" onClick={showNew}>Add User</button>*/}
                            <Button variant="primary" onClick={showNew}>Add User</Button>
                        </div>
                    </div>
                    <div className="users-menu-body">
                        <div id="users-menu-body">
                            
                            <StudentsData setData={setData} showDet={showDet} page={page} refresh={refresh} setPagenum={setPagenum} />
                            
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

export default Students