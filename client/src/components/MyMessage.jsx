import React from 'react'
import '../css/MainChat.css'
import DoneAllIcon from '@mui/icons-material/DoneAll';

function MyMessage({text,time}) {
    return (
        <div style={{display : 'flex' , flexDirection : 'row', justifyContent : 'flex-end'}}>
            <div className = 'mainchat_messages_green'>
                <div className="mainchat_messages_green_text">{text}</div>
                <div className="mainchat_messages_green_time">
                    <div>{time}</div>
                </div>
                <div className="mainchat_messages_green_seen">
                    <DoneAllIcon style = {{color : '#8b9d7d', fontSize : '16.5px'}}/> 
                </div>
            </div>
        </div>
    )
}

export default MyMessage
