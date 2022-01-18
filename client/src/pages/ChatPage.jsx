import React, { useEffect } from 'react'
import '../css/ChatPage.css'
import SideChats from '../components/SideChats'
import MainChat from '../components/MainChat'
import ProfileSection from '../components/ProfileSection'
import {selectGrpMessages,selectCurrentGroup} from '../features/groups/groups.js'
import {selectClickedUser} from '../features/user/user.js'
import {useSelector} from 'react-redux'
import remove_bg from '../images/no_message_background.jpg'

function ChatPage() {

    useEffect(() => {
        console.log(selectedUser, currentGroup)
    }, [])

    const currentGroup = useSelector(selectCurrentGroup)
    const selectedUser = useSelector(selectClickedUser)


    return (
        <div className = 'chatpage'>
            {/* SideChats */}
            <SideChats /> 
            {/* MainChat */}
            {!currentGroup && !selectedUser.name ? (
                <div style = {{width  : '62%',display : 'grid', placeItems : 'center'}}>
                    <div style = {{marginTop : '-20px' , borderRadius : '50%' , backgroundColor : 'lightgrey' ,width : '400px', height : '400px'}}>
                        <img style = {{height : '100%', width : '100%', objectFit : 'contain'}} src= {remove_bg} alt="alt" />
                    </div>
                    {/* <span style = {{fontSize: '22px', fontWeight : '600'}}>Couldn't find any messages</span> */}
                    <span style = {{marginTop : '-60px', fontSize : '20px', fontWeight : '700'}}>Click on a chat to get started</span>
                </div>
            ) : (
                <MainChat /> 
            )}
            {/* ProfileSection */}
            <ProfileSection /> 
        </div>
    )
}

export default ChatPage
