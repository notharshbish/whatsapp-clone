import React, { useEffect, useRef } from 'react'
import '../css/SideChats.css'
import avatar from '../images/avatar.jpeg'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {IconButton, Menu, MenuItem, Modal} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchChat from './SearchChat';
import SideChat from './SideChat';
import {useSelector} from 'react-redux'
import { selectUser } from '../features/user/user';
import { Box } from '@mui/system';
import { useState } from 'react';
import { addContact, contacts } from '../utils/Messages';
import {ref , getStorage, uploadBytes , getDownloadURL} from 'firebase/storage'
import axios from '../axios.js'
import {useDispatch} from 'react-redux'
import {setGroups, selectGroups} from '../features/groups/groups.js'

function SideChats() {

    const dispatch = useDispatch()
    const profilePic = JSON.parse(decodeURIComponent(document.cookie.split("=")[1])).user_picture
    const userId = JSON.parse(decodeURIComponent(document.cookie.split("=")[1])).user_id
    const user = JSON.parse(decodeURIComponent(document.cookie.split("=")[1]))
    const [members, setMembers] = useState([])
    let profilePictureDiv = useRef(null)
    let profilePicture = useRef(null)
    const storage = getStorage()



    useEffect(() => {
        getGroups()
    }, [])

    //Menu options
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    //Modal options
    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleCloseModal = () => {
        setMembers([])
        setGroupImg('https://th.bing.com/th/id/OIP.1Agw8tPi1oidtC_q4U4ZdgHaHa?pid=ImgDet&rs=1')
        setOpenModal(false);
    }
    const [err, setErr]  = useState('')
    
    //child modal options
    const [openChildModal, setOpenChildModal] = useState(false)
    const handleCloseChild = () => setOpenChildModal(false)
    const handleOpenChild = () => setOpenChildModal(true)
    
    //Box styling
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        display : 'flex' , 
        flexDirection : 'column' , 
        padding : '10px' , 
        alignItems : 'center' , 
        borderRadius : '20px' , 
        bgcolor: 'rgba(180,180,180,0.7)',
        // border: '0.5px solid #000',
        boxShadow: 24,
        p: 4,
    };

    //group vairables 
    const [groupImg, setGroupImg] = useState('https://th.bing.com/th/id/OIP.1Agw8tPi1oidtC_q4U4ZdgHaHa?pid=ImgDet&rs=1')
    const [name, setName] = useState('')
    const [desc , setDesc] = useState('')

    //group functions 
    const addToGroup = (member) => {
        if(members.length >= 1) {
            if(members[members.length - 1].user_name === member.user_name) {
                setErr('You have already added the user')
                return 
            } 
        }
        setMembers([...members, member])
        setErr('')
        // console.log('members : ' , members)
        handleCloseChild()
    }

    const setImage = (e) => {
        setGroupImg(e.target.files[0])
        let reader  = new FileReader();
        const file = e.target.files[0]
        
        reader.onload = function(e)  {
            let image = document.createElement("img");
            image.src = e.target.result;
            image.style.width = '50px'
            image.style.objectFit = 'contain'
            image.style.height = '50px'
            image.style.borderRadius = '50%'
            profilePictureDiv.current.firstChild.remove()
            profilePictureDiv.current.appendChild(image)
            // console.log(profilePictureDiv)
        }
        profilePicture = e.target
        reader.readAsDataURL(file);
    }

    const registerGroup = (url) => {
        axios.post('/group/add' , {
            users : members , 
            name : name , 
            admin : user , 
            desc : desc , 
            picture : url 
        }).then(res => {
            getGroups()
        })
    }

    const getGroups = () => {
        axios.post('/group/all', {
            id : userId
        }).then(grps => {
            dispatch(setGroups(grps.data))
        })
    }

    const uploadGrpImg = async (e) => {
        if(e.target.files === null) {
            registerGroup(groupImg)
        }
        else {
            const imageRef = ref(storage, `${Date.now()}_${groupImg.name}`)
            uploadBytes(imageRef, groupImg).then((snapshot) => {
                getDownloadURL(imageRef)
                .then(async (url) => {
                    await registerGroup(url)
                    getGroups()
                })
            })
        }
        handleCloseModal()
    }


    return (
        <div className='sidechats'>
            {/* Header */}
            <div className="sidechats_header">
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleModalOpen}>Create a group</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
                <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div ref = {profilePictureDiv} style = {{position : 'relative' , width : '100%' , display : 'flex', justifyContent : 'center'}}>
                            <img src= {groupImg} alt="profile" style = {{width : '50px', height : '50px', borderRadius : '50%'}}/>
                            <input type="file" onChange = {e => setImage(e)} style = {{position : 'absolute', right : '0px', bottom : '10px', opacity : 0}} />
                        </div>
                        {/* <img style = {{width : '40px', height : '40px'}} src="https://static.whatsapp.net/rsrc.php/yz/r/lOol7j-zq4u.svg" alt="whatsapp_logo" /> */}
                        <input type="text" value = {name} onChange = {e => setName(e.target.value)} placeHolder = 'Enter a group name' style = {{padding : '7px 12px', borderRadius : '10px', width : '100%', marginTop : '20px', outline : 'none', border : 'none'}} />
                        <input type="text" value = {desc} onChange = {e => setDesc(e.target.value)} placeHolder = 'Enter a group description' style = {{padding : '7px 12px', borderRadius : '10px', width : '100%', marginTop : '20px', outline : 'none', border : 'none'}} />
                        <div style = {{width : '100%' , display : 'flex', marginTop : '20px' , alignItems : 'center'}}>
                            <div style = {{display : 'flex' , flex : 1}}>
                                {members?.map(member => (
                                    <div style = {{height : '40px', width : '40px',margin : '0 6px', backgroundColor : 'white', borderRadius : '50%'}}>
                                        <img 
                                            src = {member.user_picture} 
                                            alt = {member.user_name + '-image'}
                                            style ={{height : '100%', width : '100%', borderRadius : '50%', objectFit : 'contain'}} />
                                    </div>
                                ))}
                            </div>
                            <div role = 'button' onClick={handleOpenChild} style = {{flex : 0}}>
                                <img style = {{cursor : 'pointer'}} src="https://img.icons8.com/ios/35/ffffff/add--v1.png"/>
                            </div>
                        </div>
                        <button
                            onClick = {e => uploadGrpImg(e)}
                            style = {{
                                width : '100%', 
                                outline : 'none', 
                                border: 'none',
                                marginTop : '10px', 
                                padding : '10px', 
                                letterSpacing : '0.54px', 
                                fontWeight: 600, 
                                backgroundColor : '#128c7e' , 
                                color : 'white', 
                                fontFamily : 'Arial', 
                                borderRadius : '10px' , 
                                cursor : 'pointer'
                            }}
                        >Create Group</button>
                        <span style = {{fontSize : '13px', marginTop : '8px', color : 'red'}}>{err}</span>
                        <Modal 
                            open = {openChildModal}
                            onClose = {handleCloseChild}
                        >
                            <Box sx = {style} style = {{height : '500px', overflowY : 'scroll' , padding : '10px 40px', width : 'fit-content' , backgroundColor : 'white', borderRadius : '5px'}}>
                                <div style = {{display : 'flex', flexDirection : 'column'}}>
                                    {contacts?.map(contact => (
                                        <div onClick = {e => addToGroup(contact)} style = {{margin : '10px 0' ,  alignItems : 'center' , display : 'flex' , width : '100%', cursor : 'pointer'}}>
                                            <div style = {{height : '50px', width : '50px', borderRadius : '50%', backgroundColor : 'black'}}>
                                                <img 
                                                    src = {contact.user_picture} 
                                                    alt= {contact.user_name + '-image'}
                                                    style ={{height : '50px', width : '50px', flex : 0, objectFit : 'contain', borderRadius : '50%'}} />
                                            </div>
                                            <div style = {{flex : 1, marginLeft : '30px ', fontWeight : '600', fontSize : '16px'}}>
                                                {contact.user_name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Box>
                        </Modal>
                    </Box>
                </Modal>
                <div className="sidechats_header_left">
                    <div className="sidechats_header_profile">
                        <img src = {profilePic} alt = 'your_photo' /> 
                    </div>
                </div>
                <div className="sidechats_header_right">
                    <div className="sidechats_header_status">
                        <IconButton>
                            <DonutLargeIcon /> 
                        </IconButton>
                    </div>
                    <div className="sidechats_header_chats">
                        <IconButton>
                            <ChatIcon /> 
                        </IconButton>
                    </div>
                    <div className="sidechats_header_morevert">
                        <IconButton onClick = {handleClick}>
                            <MoreVertIcon /> 
                        </IconButton>
                    </div>
                </div>
            </div>
            {/* Search */}
            <SearchChat /> 
            {/* Chats */}
            <SideChat /> 
        </div>
    )
}

export default SideChats
