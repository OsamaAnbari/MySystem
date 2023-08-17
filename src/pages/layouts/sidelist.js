import '../../styles/sidelist.css'

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import homei from  '../../imgs/icons/home-icon.svg'
import studentsi from  '../../imgs/icons/users-icon.svg'
import personali from  '../../imgs/icons/statistic-icon.svg'
import activitiesi from  '../../imgs/icons/activities-icon.svg'
import messagesi from  '../../imgs/icons/mail-icon.svg'
import passwordi from  '../../imgs/icons/password-icon.svg'

const Sidelist = () => {

    const navigate = useNavigate()
    const [nav, setNav] = useState('/home')

    useEffect(() => {
        navigate(nav)
    }, [nav, navigate])

    return(
        <div className="side-list">
            <div>
                <b>Services</b>
            </div>
            <aside>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className={document.location.pathname==='/home' ? "active" : ""} onClick={() => setNav('/home')}>
                        <div className="list-imgs"><img alt="not found" src={homei}></img></div>
                        <div className="list-txt">Home Page</div>
                    </li>
                    {sessionStorage.getItem('role') === 'admin' && <li className={document.location.pathname==='/students' ? "active" : ""} onClick={() => setNav('/students')}>
                        <div className="list-imgs"><img alt="not found" src={studentsi}></img></div>
                        <div className="list-txt">Students List</div>
                    </li>}
                    <li className={document.location.pathname==='/activities' ? "active" : ""} onClick={() => setNav('/activities')}>
                        <div className="list-imgs"><img alt="not found" src={activitiesi}></img></div>
                        <div className="list-txt">Activities</div>
                    </li>
                    <li className={document.location.pathname==='/messages' ? "active" : ""} onClick={() => setNav('/messages')}>
                        <div className="list-imgs"><img alt="not found" src={messagesi}></img></div>
                        <div className="list-txt">Messages</div>
                    </li>
                    <li className={document.location.pathname==='/personal-infos' ? "active" : ""} onClick={() => setNav('/personal-infos')}>
                        <div className="list-imgs"><img alt="not found" src={personali}></img></div>
                        <div className="list-txt">Personal Infos</div>
                    </li>
                    <li className={document.location.pathname==='/password' ? "active" : ""} onClick={() => setNav('/password')}>
                        <div className="list-imgs"><img alt="not found" src={passwordi}></img></div>
                        <div className="list-txt">Change Password</div>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default Sidelist