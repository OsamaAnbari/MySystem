import { login_api } from '../../config';

import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

import '../../styles/buttons.css'
import '../../styles/login.css'

import logo from '../../imgs/Logo.png'
import background from '../../imgs/login background.svg'

function LoginNav({useradmin, setUseradmin}) {
    return(
        <nav className="navbar-main">
            <div className="navbar-div">
                <div className="navbar-main-left">
                    <img src={logo} alt="not found" width="50"></img> 
                    <div className="navbar-brand"><b>MY SYSTEM</b></div>
                </div>
                <div className="navbar-main-center">
                    <div><b>Login</b></div>
                    <div>Donate</div>
                    <div>Our Projects</div>
                    <div>Search</div>
                    <div>About Us</div>
                </div>
                <div className="navbar-main-right">
                    {useradmin && <button className="btn btn-ylo" onClick={(e) => {setUseradmin(false)}}>Admin Login</button>}
                    {!useradmin && <button className="btn btn-ylo" onClick={(e) => {setUseradmin(true)}}>User Login</button>}
                </div>
            </div>
        </nav>
    )
}

function AdminLogin ({useradmin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [api, setApi] = useState(`${login_api}/admin`)
    
    const navigate = useNavigate();

    React.useEffect(() => {
        if(useradmin){
            setApi(`${login_api}/user`)
        } else {
            setApi(`${login_api}/admin`)
        }
    }, [useradmin])

    const handle = (e) => {
        e.preventDefault()
            
        fetch(api, {
            //mode: 'no-cors',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                "tc": username,
                "password": password
            }),
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(res => {
            if(res.data){
                if(res.data.role === "admin"){
                    console.log(res.data._id)
                    sessionStorage.setItem("name", `${res.data.name} ${res.data.surname}`)
                    sessionStorage.setItem("role", `${res.data.role}`)
                    sessionStorage.setItem("id", `${res.data._id}`)
                    localStorage.setItem("signedIn", true)
                    navigate('/students')
                }else if (res.data.role === "student"){
                    console.log(res.data._id)
                    sessionStorage.setItem("name", `${res.data.name} ${res.data.surname}`)
                    sessionStorage.setItem("role", `${res.data.role}`)
                    sessionStorage.setItem("id", `${res.data._id}`)
                    localStorage.setItem("signedIn", true)
                    navigate('/students')      
                } else {
                    alert("Role is not admin")
                }
            }else{
                alert("Username or Password is wrong")
            }
        })
        .catch(error => {
            alert("Server error, please try again later...")
            console.log('error', error)
        })
    }

    return(
        <div id="loginBox">
            <h2 style={{"color":"#313131", "padding": "15px"}}><b>{useradmin ? 'User Login' : 'Admin Login'}</b></h2>
            <div>
                <Form onSubmit={handle}>
                    <InputGroup className="mb-3">
                        <Form.Control placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}  />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Button type="submit">Login</Button>
                    </InputGroup>
                    {
                        useradmin && 
                        <div>
                            <p>
                                Dafault password is first 4 number of TC and ASIL
                                <br></br>
                                <b>Example : </b>1234ASIL
                            </p>
                        </div>
                    }
                </Form>
            </div>
        </div>
    )
}

function LoginForm({useradmin}) {

    return(
        <div className="container-fluid text-center" id="login-main-container">
                <div className="row">
                    <div className="col-lg-7">
                        <img id="back-img" src={background} alt="not found"></img>
                    </div>
                    <div className="col-lg-5" id="login-col">
                        <AdminLogin useradmin={useradmin} />
                    </div>
                </div>
            </div>
    )
}

function Login() {
    document.title = "Login Page"
    const [useradmin, setUseradmin] = useState(true)
    return (
        <div className="page">
            <LoginNav useradmin={useradmin} setUseradmin={setUseradmin} />
            <LoginForm useradmin={useradmin} />
        </div>
    )
}

export default Login