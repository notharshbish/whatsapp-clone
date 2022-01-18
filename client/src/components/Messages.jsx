import React, {useEffect, useState} from 'react'
import '../css/MainChat.css'
import MyMessage from './MyMessage'
import YourMessage from './YourMessage'
import axios from '../axios.js'
import {useDispatch, useSelector} from 'react-redux'
import {setMessages, selectMessages} from '../features/messages/messages.js'
import {selectGrpMessages,selectCurrentGroup} from '../features/groups/groups.js'
import GroupMessage from './GroupMessage'
import {selectClickedUser} from '../features/user/user.js'

function Messages() {

    const [msgs, setMsgs] = useState([])
    const dispatch = useDispatch()
    const selectedUser = useSelector(selectClickedUser)
    const messages = useSelector(selectMessages)
    const myId = JSON.parse(decodeURIComponent(document.cookie.split("=")[1])).user_id
    const grpMessages = useSelector(selectGrpMessages)
    const currentGroup = useSelector(selectCurrentGroup)
    
    useEffect(() => {
        console.log(messages)
    }, [messages])

    return (
        <div className = 'mainchat_messages'> 
            {grpMessages && grpMessages?.map(({message_text,message_time,message_from,user_name}) => (
                myId === message_from ? (
                    <MyMessage time = {message_time.split(",")[2]} text = {message_text}/>
                    ) : (
                    <GroupMessage text = {message_text} time = {message_time.split(",")[2]} username = {user_name}/> 
                    // <YourMessage time = {message_time.split(",")[2]} text = {message_text}/> 
                )
            ))}
            {!grpMessages.length && messages?.map(({user_id, message_text , message_time}) => (
                myId === user_id ? (
                    <MyMessage time = {message_time.split(",")[2]} text = {message_text}/>
                ) : (
                    <YourMessage time = {message_time.split(",")[2]} text = {message_text}/> 
                )
            ))}
        </div>
    )
}

export default Messages
