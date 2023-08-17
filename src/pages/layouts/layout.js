import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { logout_api } from "../../config";

//import '../../styles/bootstrap.css'
import '../../styles/layout.css'
import '../../styles/buttons.css'

import Sidelist  from "./sidelist"
import logo from '../../imgs/Logo.png'
import personal1 from '../../imgs/personal1.png'

const Layout = ({Body, title}) => {
    const [blur, setBlur] = useState(false)

    const navigate = useNavigate();

    function logout (e) {
        e.preventDefault()
    
        fetch(logout_api, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            })
            .then(response => response.json())
            .then(res => {
                /*localStorage.removeItem("signedIn")
                sessionStorage.removeItem("name")
                sessionStorage.removeItem("role")
                navigate('/')*/
            })
            .catch(error => console.log('error', error))
            .finally(() => {
                localStorage.removeItem("signedIn")
                sessionStorage.removeItem("name")
                sessionStorage.removeItem("role")
                sessionStorage.removeItem("id")
                navigate('/')
            })
    }

    return(
        <div className="container-fluid">
            {
            blur && <div className="blur" onClick={(e) => {setBlur(false)}} style={{left:"0px", right:"0px"}}></div>
            }
        <div className="row">
            <div className="col-sm-2 side-bar">
                <div className="navbar-left">
                    <img alt="not found" src={logo} width="50" />
                    <a className="navbar-brand" href="index.html"><b>MY SYSTEM</b></a>
                </div>
                <Sidelist />
            </div>
            
            <div className="col-sm-10 main" style={{"padding":" 0px"}}>
                <nav className="navbar-pages">
                    <div className="navbar-div">
                        <div className="navbar-center">
                            {title}
                        </div>
                        <div className="navbar-right">
                            <div>
                                <img className="personal-img-sml" alt="not found" src={personal1} width="35px" height="35px"></img>
                            </div>
                            <div>
                                <p><b>{window.sessionStorage.getItem("name") ?? 'Name'}</b></p>
                            </div>
                            <div>
                                <button className="btn btn-red" name="Logout" onClick={logout} style={{"marginLeft":"5%"}}>{">"}</button>
                            </div>
                        </div>
                    </div>
                </nav>
                <Body blur={blur} setBlur={setBlur}/>
            </div>
        </div>
    </div>
    )
}

export default Layout