import '../../styles/cards.css'

import { useEffect, useState } from "react"

import { admins_api, students_api } from "../../config"
import altimg from '../../imgs/personal.png'
import loadingimg from '../../imgs/loading.gif'

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
        return <div><img alt="Not found" src={loadingimg} width="20px" /><div>Loading</div></div>
    } else {
        return (
            <>
                <div className='card-txts'>
                    <div>
                        <div style={{marginTop:"4px"}}><b>Name : </b>{items.name} {items.surname}</div>
                        <div style={{marginTop:"4px"}}><b>TC : </b>{items.tc}</div>
                        <div style={{marginTop:"4px"}}><b>Role : </b>{items.role}</div>
                    </div>
                    <div>
                        <img className="my-border personal-img" src={items.image ?? altimg} alt="Not found" width="100px"  height="100px"/>
                    </div>
                </div>
            </>
        );
    }
}

function Home () {
    return(
        <div style={{padding:"30px"}}>
            <div className="card" style={{width:"450px"}}>
                <div className='card-content'>
                    <div className='card-title'>About Me</div>
                    <Infos />
                </div>
            </div>
        </div>
    )
}

export default Home