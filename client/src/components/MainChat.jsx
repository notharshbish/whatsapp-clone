import React from "react";
import "../css/MainChat.css";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import friend from "../images/friend_profile.jfif";
import MainChatFooter from "./MainChatFooter";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfileValue,
  setProfileSection,
} from "../features/profile-section/profile.js";
import { selectClickedUser } from "../features/user/user";
import store from "../app/store";
import {selectCurrentGroup} from '../features/groups/groups.js'

function MainChat() {
  const dispatch = useDispatch();

  const selectedUser = useSelector(selectClickedUser)
  const openProfile = (e) => {
    dispatch(setProfileSection(true));
  };
  const currentGrp = useSelector(selectCurrentGroup)

  return (
    <div className="mainchat">
      {/* Header */}
      <div className="mainchat_header">
        <div className="mainchat_header--left">
          {/* Profile */}
          <div className="mainchat_header_profile">
            <img src={currentGrp ? currentGrp.pic : selectedUser.pic} alt="user_photo" />
          </div>
          {/* Username */}
          <div className="mainchat_header_username">
            <span>{currentGrp ? currentGrp.name : selectedUser.name}</span>
          </div>
        </div>
        <div className="mainchat_header--right">
          {/* Search */}
          <div className="mainchat_header_search">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          {/* More */}
          <div className="mainchat_header_more">
            <IconButton onClick={(e) => openProfile(e)}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {/* Messages */}
      <Messages />
      {/* Footer */}
      <MainChatFooter />
    </div>
  );
}

export default MainChat;
