import React from 'react'
import '../css/SideChats.css'
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import friend from '../images/friend_profile.jfif'
import { selectChat } from '../utils/Messages.js'

function UserSideChat({sender,id,name,picture,status,phone}) {
    return (
        <div role = 'button' onClick = {e => selectChat(sender,id,name,picture,status,phone)} className = 'sidechats_sidechat'>
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
                        <div className="sidechats_sidechat_title_main">{name}</div>
                        <div className="sidechats_sidechat_title_time">10:20 AM</div>
                    </div>
                    <div className="sidechats_sidechat_text">
                        <div className="sidechats_sidechat_text--left">
                            <div className="sidechats_sidechat_text_doneall" >
                                <DoneAllIcon style = {{fontSize : '20px' , color : '#67cbf8'}}/> 
                            </div>
                            <div className="sidechats_sidechat_text_last">Hello Tanay</div>
                        </div>
                        <div className="sidechats_sidechat_text--right">
                            <div className="sidechats_sidechat_text_mute_icon">
                                <VolumeOffIcon style = {{fontSize : '19px'}}/> 
                            </div>
                            <div className="sidechats_sidechat_text_notifications">
                                <span>2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSideChat
