import React, {useState} from "react";
import "../css/MainChat.css";
import { IconButton } from "@mui/material";
import MoodIcon from "@mui/icons-material/Mood";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import axios from '../axios.js'
import moment from 'moment'
import { sendMessage } from "../utils/Messages";
import {selectCurrentGroup} from '../features/groups/groups.js'
import {sendGroupMessage} from '../utils/Messages.js'
import { useSelector } from "react-redux";

function MainChatFooter() {
  const  [message, setMessage] = useState('')
  const currentGrp =  useSelector(selectCurrentGroup)
  const userId = JSON.parse(decodeURIComponent(document.cookie.split("=")[1])).user_id

  const sendMessageJsx = (e) => {
    e.preventDefault()
    if(currentGrp) {
      sendGroupMessage(currentGrp.id , message , moment().format('dddd, MMMM Do YYYY, h:mm A'), userId)
    } else {
      sendMessage(message, moment().format('dddd, MMMM Do YYYY, h:mm A'))
    }
    setMessage('')
  }

  return (
    <form onSubmit = {e => sendMessageJsx(e)} className="mainchat_footer">
      <div className="mainchat_footer_emoticons">
        <IconButton>
          <MoodIcon />
        </IconButton>
      </div>
      <div className="mainchat_footer_pin">
        <IconButton>
          <AttachFileIcon />
        </IconButton>
      </div>
      <div className="mainchat_footer_enter">
        <input type="text" value = {message} onChange = {e => setMessage(e.target.value)} placeholder="Type a message" />
      </div>
      <div className="mainchat_footer_mic">
        <IconButton>
          <KeyboardVoiceIcon />
        </IconButton>
      </div>
    </form>
  );
}

export default MainChatFooter;
