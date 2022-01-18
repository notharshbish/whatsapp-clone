import React from 'react'
import '../css/MainChat.css'
import DoneAllIcon from '@mui/icons-material/DoneAll';

function MyMessage({text,time}) {
    return (
        <div style={{display : 'flex' , flexDirection : 'row', justifyContent : 'flex-start'}}>
            <div className = 'mainchat_messages_white'>
                <div className="mainchat_messages_white_text">{text}</div>
                <div className="mainchat_messages_white_time">
                    <div>{time}</div>
                </div>
            </div>
        </div>
    )
}

export default MyMessage
