import { useState } from "react"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {password_api} from '../../config'

function Password () {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [valError, setValError] = useState({})

    function passVal(e){
        e.preventDefault()
        if(newPassword !== newPassword1){
            setValError({pass: 'New password not corresponding'})
        } else {
            setValError({pass: ''})
            handle(e)
        }
        if(!password){
            setValError({oldpass: 'Please enter current password'})
        }
    }

    function handle (e) {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
        "old": password,
        "new": newPassword
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        credentials : 'include'
        }

        fetch(password_api, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message){
                alert(result.message)
            } else {
                alert("Password is changed successfuly")
                window.location.reload()
            }
        })
        .catch(error => console.log(error));
    }

    return(
        <>
            <div style={{padding:"2%"}}>
                <Form style={{width:"300px"}}>
                    <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        isInvalid={!!valError.oldpass} required />
                        <Form.Control.Feedback type="invalid">
                            {valError.oldpass}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                        placeholder="Rewrite the new password"
                        type="password"
                        value={newPassword1}
                        onChange={e => setNewPassword1(e.target.value)} required
                        isInvalid={!!valError.pass} />
                        <Form.Control.Feedback type="invalid">
                            {valError.pass}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button
                        onClick={e => {
                            passVal(e)
                        }}
                        >
                            Change Password
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default Password