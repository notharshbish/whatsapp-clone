import React from 'react'
import '../css/MainChat.css'
import DoneAllIcon from '@mui/icons-material/DoneAll';

function MyMessage({text,time,username}) {
    return (
        <div style={{display : 'flex' , flexDirection : 'row', justifyContent : 'flex-start'}}>
            <div className = 'mainchat_messages_white' style = {{display : 'flex' , flexDirection : 'column'}}>
                <span style = {{position : 'absolute',color : 'green' , fontSize : '12px',padding : '5px 0'}}>{username}</span>
                <div style = {{display : 'flex', flexDirection: 'row', margin : '17px 0 0 0'}}>
                    <div className="mainchat_messages_white_text">{text}</div>
                    <div className="mainchat_messages_white_time">
                        <div>{time}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyMessage
