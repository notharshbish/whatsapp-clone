import React , {useState} from 'react'
import '../css/SideChats.css'
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import {useDispatch,useSelector} from 'react-redux'
import {setCurrentGroup, setGrpMessages, setGrpUsers} from '../features/groups/groups.js'
import axios from '../axios.js';

function GroupSideChat({picture, grpName,id , groupId, grpStatus}) {

    // const [grpMessages, setGrpMessages] = useState([])
    const dispatch = useDispatch()

    const handleGroupClick = (e) => {
        dispatch(setCurrentGroup({id : groupId, name : grpName , pic : picture, status : grpStatus}))
        axios.get(`/group/get/${groupId}`).then(res => {
            localStorage.setItem('grpMessages' , JSON.stringify(res.data))
            dispatch(setGrpMessages(res.data))
        })
        axios.get(`/group/users/${groupId}`).then(res => {
            localStorage.setItem('grpUsers' , JSON.stringify(res.data))
            dispatch(setGrpUsers(res.data))
        })
    }

    return (
        <div role = 'button' onClick = {e => handleGroupClick(e)} className = 'sidechats_sidechat'>
            <div className="sidechats_sidechat--left">
                <div className="sidechats_sidechat_profile">
                    <img 
                        src= {picture} 
                        alt = 'c_i' 
                    />
                </div>
            </div>
            <div className="sidechats_sidechat--right">
                <div className="sidechats_sidechat_descript">
                    <div className="sidechats_sidechat_title">
                        <div className="sidechats_sidechat_title_main">{grpName}</div>
                        <div className="sidechats_sidechat_title_time">12:43 PM</div>
                    </div>
                    <div className="sidechats_sidechat_text">
                        <div className="sidechats_sidechat_text--left">
                            <div className="sidechats_sidechat_text_number">+91 98323 71234</div>
                            <div className="sidechats_sidechat_text_divide">:</div>
                            <div className="sidechats_sidechat_text_last">HELLO GUYS</div>
                        </div>
                        <div className="sidechats_sidechat_text--right">
                            <div className="sidechats_sidechat_text_mute_icon">
                                <VolumeOffIcon style = {{fontSize : '19px'}}/> 
                            </div>
                            <div className="sidechats_sidechat_text_notifications">
                                <span>30</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupSideChat
