import React from 'react'
import Header from '../components/RegisterPage/Header'
import '../css/LoginPage.css'
import axios from '../axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../features/user/user.js'

function LoginPage() {

    const [error, setError] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const history = useNavigate()
    const dispatch = useDispatch()


    const handleLogin = () => {
        axios.post('/user/login', {
            phone : phone , 
            password : password
        })
        .then(res => {
            dispatch(setUser(JSON.parse(decodeURIComponent(document.cookie.split("=")[1]))))
            history('/chat')
        })
        .catch(err => {
            const error = {err}
            console.log(error)
        })
    }

    return (
        <div className  = 'loginpage'> 
            <Header /> 
            <div className="lpg_container_master">
                <div className="lpg_container">
                    <div className="lpg_container_logo">
                        <img src="https://static.whatsapp.net/rsrc.php/yz/r/lOol7j-zq4u.svg" alt="whatsapp_logo" />
                    </div>
                    <div className="lpg_container_form">
                        <div className="lpg_container_form_phone">
                            <span>Phone number</span>
                            <input value = {phone} onChange={e => setPhone(e.target.value)} type="text" />
                        </div>
                        <div className="lpg_container_form_password">
                            <span>Password</span>
                            <input value = {password} onChange = {e => setPassword(e.target.value)} type="password" />
                        </div>
                        <div role = 'button' onClick={e => handleLogin()} className="lpg_container_form_btn">
                            LOGIN
                        </div>
                    </div>
                    <div className="lpg_container_register">
                        <span>Not a user already?</span>
                        <a href="/register">Register here</a>
                    </div>
                    <span>{error}</span>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
