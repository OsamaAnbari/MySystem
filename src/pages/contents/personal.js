import { useEffect, useState } from "react"

import { admins_api, students_api } from "../../config";
import altimg from '../../imgs/personal.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Infos () {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});
  
    useEffect(() => {
        document.title = "Students List"
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        let api
        if(sessionStorage.getItem("role") === 'admin'){
            api = admins_api
        } else if (sessionStorage.getItem("role") === 'student'){
            api = students_api
        }

        fetch(api, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            credentials: "include"
        })
        .then(res => res.json())
        .then(
            (result)=> {
                setIsLoaded(true)
                setItems(result[0])
            }
        )
        .catch(err => {
            setIsLoaded(true)
            alert('Server error, please try again later')
            console.log(err)
        })
    }, [])

    if (items.error) {
        return <div>Error: {items.error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div className="card">
                    <Form className="popup-content">
                        <div className="popup-content-col1">
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={{width:"25%"}} id="basic-addon2">TC</InputGroup.Text>
                                <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{items.tc}</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Name</InputGroup.Text>
                                <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{items.name}</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Surname</InputGroup.Text>
                                <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{items.surname}</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Department</InputGroup.Text>
                                <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{items.department}</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Mobile</InputGroup.Text>
                                <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{items.mobile}</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={{width:"25%"}} id="basic-addon2">Email</InputGroup.Text>
                                <InputGroup.Text style={{width:"75%"}} id="basic-addon2">{items.email}</InputGroup.Text>
                            </InputGroup>
                        </div>
                        <div className="popup-content-col2">
                            <div className="popup-content-div">
                                <img alt="Not found" src={items.image ? items.image : altimg} className="my-border personal-img" id="personal-img" width="200px" height="200px" />
                            </div>
                        </div>
                    </Form>
                </div>
            </>
        );
    }
}

function Personal () {
    return(
        <div className="main-employees">
            <Infos />
        </div>
    )
}

export default Personal