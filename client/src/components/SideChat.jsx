import React, { useEffect, useState } from 'react'
import '../css/SideChats.css'
import GroupSideChat from './GroupSideChat'
import UserSideChat from './UserSideChat'
import axios from '../axios.js'
import {setContacts} from '../utils/Messages.js'
import {selectGroups} from '../features/groups/groups.js'
import {useSelector} from 'react-redux'

function SideChat() {

    const [friends, setFriends] = useState([])
    const groups = useSelector(selectGroups)

    const id = JSON.parse(decodeURIComponent(document.cookie.split("=")[1])).user_id

    useEffect(() => {
        async function getFriends () {
            axios.post('/user/all' , {
                id : id
            }).then(res => {
                setContacts(res.data)
                setFriends(res.data)
            })
        }
        getFriends()
    },[])

    return (
        <div className = 'sidechats_sidechat_column'>
            {
                friends?.map(friend => (
                    <UserSideChat sender = {id} phone = {friend.user_phone} status = {friend.user_status} picture = {friend.user_picture} id = {friend.user_id} name = {friend.user_name}/> 
                ))
            }
            {
                groups?.map(group => (
                    <GroupSideChat id = {id} groupId = {group.group_id} picture = {group.group_pic} grpName = {group.group_name} grpStatus = {group.group_desc}/>
                ))
            }
        </div>
    )
}

export default SideChat
