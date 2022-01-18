import axios from "../axios.js";
import store from "../app/store.js";
import { setMessages } from "../features/messages/messages.js";
import { setSelectedUser } from "../features/user/user.js";
import {setCurrentGroup, setGrpMessages} from '../features/groups/groups.js'

let senderId ; 
let receiverId  ; 

export let messages ; 
export let contacts ; 

export async function selectChat(sender, receiver,name,picture,status, phone) {
    senderId = sender 
    receiverId = receiver 
    console.log(senderId , " is sending message to ", receiverId)
    getChatMessages(senderId, receiverId)
    store.dispatch(setSelectedUser({
        name : name , 
        pic : picture , 
        status : status , 
        phone : phone
    }))
    store.dispatch(setCurrentGroup(null))
    store.dispatch(setGrpMessages([]))
}

export async function sendMessage(msg, time) {
    await axios.post('/message/send', {
        message : msg , 
        time : time , 
        sender : senderId , 
        receiver : receiverId
    }).then(res => {
        getChatMessages(senderId, receiverId)
    })
}

async function getChatMessages(sender, getter) {
    messages = await axios.post('/message/all', {
        senderId : sender , 
        receiverId : getter 
    }).then(res => {
        return res.data
    })
    console.log('Run hua ', messages)
    store.dispatch(setMessages(messages))
}


async function getGroupMessages(gId) {
    axios.get(`/group/get/${gId}`).then(res => {
        store.dispatch(setGrpMessages(res.data))
    })
}

export async function sendGroupMessage(groupId,text,time,userId) {
    axios.post(`/group/send/${groupId}` , {
        text : text , 
        time : time , 
        userId : userId 
    }).then(res => {
        getGroupMessages(groupId)
    })
}


export function setContacts (cts) {
    contacts = cts
    console.log(contacts)
}

export function addContact(ctn) {
    contacts.push(ctn)
}
