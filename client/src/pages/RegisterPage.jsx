import React from 'react'
import { useState , useRef } from 'react'
import Header from '../components/RegisterPage/Header'
import '../css/RegisterPage.css'
import status from '../images/friend_profile.jfif'
import axios from '../axios.js'
// import {} from '../firebase.js'
import {ref , getStorage, uploadBytes , getDownloadURL} from 'firebase/storage'
import { firebaseApp } from '../firebase.js'
import {useNavigate} from 'react-router-dom'

function RegisterPage() {

    // console.log(ref())
    const storage = getStorage()
    const history = useNavigate()

    const [password, setPassword] = useState('')
    const [inputImage, setInputImage] = useState('https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
    const [imgName, setImgName] = useState('Default Photo')
    const [name, setName] = useState('')
    const [phone,setPhone] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')

    
    let profilePicture = useRef(null)
    const profilePictureDiv = useRef(null)

    
    const setImage = (e) =>  {
        setImgName(e.target.files[0].name)
        setInputImage(e.target.files[0])
        setError('')
        let reader  = new FileReader();
        const file = e.target.files[0]
        
        reader.onload = function(e)  {
            let image = document.createElement("img");
            image.src = e.target.result;
            profilePictureDiv.current.lastChild.remove()
            profilePictureDiv.current.appendChild(image);
        }
        profilePicture = e.target
        reader.readAsDataURL(file);
    }


    //function to add the user to the database
    const registerUser = async (url) => {
        console.log('The url of the image is : ', url)
        axios.post('/user/register' , {
            name : name , 
            phone : phone,
            password : password, 
            picture : url , 
            status : status
        })
        .then(res => console.log('User was registered successfully !'))
        .catch(err => {
            const error = {err}
            setError(error.err.response)
        })
    }

    const uploadImage = async (e) => {
        if(e.target.files === null) {
            console.log('I am default image')
            registerUser(inputImage)
        }
        else {
            const imageRef = ref(storage, `${Date.now()}_${inputImage.name}`)
            uploadBytes(imageRef, inputImage).then((snapshot) => {
                getDownloadURL(imageRef)
                .then(async (url) => {
                    console.log(url)
                    await registerUser(url)
                    history('/login')
                })
            })
        }
    }

    return (
        <div className = 'registerpg'>
            <Header />
            <div className="rpg_register_container_master">
                <div className="rpg_register_container">
                    <div ref = {profilePictureDiv} className="rpg_register_container_logo">
                        <input type="file" name = 'profilePic' accept = 'image/*' onChange={e => setImage(e)}/>
                        <img src= {inputImage} alt="register_logo" />
                    </div>
                    <span style = {{margin : '10px 0 '}}>{imgName}</span>
                    <div className="rpg_register_container_form">
                        <div>
                            <span>Username</span>
                            <span className = 'register_form_error'>{name !== '' && name.trim(' ').length < 6 ? 'Username should contain atleast 6 characters' : null}</span>
                            <input value = {name} onChange = {e => setName(e.target.value)} type="text" placeholder = "abc@20" />
                        </div>
                        <div>
                            <span>Password</span>
                            <span className = 'register_form_error'>{password !== '' && password.trim(' ').length < 6 ? 'Password should contain atleast 6 characters' : null}</span>
                            <input type="password" value = {password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <span>Phone number</span>
                            <span className = 'register_form_error'>{phone !== '' && (phone.split(' ')[0] !== '+91' || phone.split(' ')[1]?.length !== 5 || phone.split(' ')[2]?.length !== 5) ? 'Enter the phone number in the given format': null}</span>
                            <input value = {phone} onChange = {e => setPhone(e.target.value)} type="text" placeholder='+91 89045 78321'/>
                        </div>
                        <div>
                            <span>Status</span>
                            <span className = 'register_form_error'></span>
                            <input value = {status} onChange={e => setStatus(e.target.value)} type="text" placeholder='Hey there! I am on whatsapp'/>
                        </div>
                    </div>
                    <div role = 'button' onClick = {e => {name && phone && password && inputImage ? uploadImage(e) : alert('Enter all the information')}}  className="rpg_register_container_btn">
                        <div className="rpg_register_container_btn--center">
                            REGISTER
                        </div>
                    </div>
                </div>
                <span style = {{color : 'red', fontSize : '14px', fontFamily : 'sans-serif'}}>{error}</span>
            </div>
        </div>
    )
}

export default RegisterPage
