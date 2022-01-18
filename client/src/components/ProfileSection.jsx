import React, { useEffect, useState } from "react";
import "../css/ProfileSection.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import friend from "../images/friend_profile.jfif";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileSection,
  selectProfileValue,
} from "../features/profile-section/profile.js";
import { selectClickedUser } from "../features/user/user";
import {selectGrpUsers, selectCurrentGroup} from '../features/groups/groups.js'

function ProfileSection() {
  const dispatch = useDispatch();

  const profileValue = useSelector(selectProfileValue);
  const currentGrp = useSelector(selectCurrentGroup)
  const selectedUser = useSelector(selectClickedUser)
  const members = useSelector(selectGrpUsers)

  useEffect(() => {
    console.log(selectedUser)
  }, [])

  const handleAbout = (e) => {
    dispatch(setProfileSection(false));
  };

  return (
    <div className={profileValue ? "profilesection open" : "close"}>
      <div className="profilesection_header">
        <div className="profilesection_header_cross">
          <IconButton onClick={(e) => handleAbout(e)}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="profilesection_header_contact">Contact Info</div>
      </div>
      <div className="profilesection_user">
        <div className="profilesection_user_profile">
          <img src={currentGrp ? currentGrp.pic : selectedUser?.pic} alt="my_big_photo" />
        </div>
        <div className="profilesection_user_text">
          <div className="profilesection_user_text_title">{currentGrp ? `${currentGrp.name}` : selectedUser?.name}</div>
          <div className="profilesection_user_text_number">{currentGrp ? null : selectedUser?.phone}</div>
        </div>
      </div>
      <div className="profilesection_about">
        <div className="profilesection_about_title">About</div>
        <div className="profilesection_about_text">{currentGrp ? currentGrp.status : selectedUser?.status}</div>
      </div>
      {
        currentGrp  && (
          <div className="profilesection_users" style = {{
            padding : '15px 25px' , 
            margin : '20px 0 0 0' , 
            display : 'flex' , 
            flexDirection : 'column' , 
            backgroundColor : 'white'
          }}>
            <div className="profilesection_users_title" style = {{color : '#989898'}}>Participants</div>
            <div className="profilesection_users_map" style = {{margin : '20px 0 0 0'}}>
              {members.map(member => (
                <div className="profilesection_users_user" style = {{position : 'relative', display : 'flex' , flexDirection: 'row', alignItems : 'center' , margin : '20px 0', padding : '7px 0'}}>
                  <img src= {member.user_picture} alt="member_img" style = {{
                    height : '50px' , 
                    width : '50px' , 
                    objectFit  : 'contain' , 
                    borderRadius : '50%'
                  }}/>
                  <div className="info" style = {{display : 'flex' , flexDirection: 'column' , margin : '0 0 0 30px'}}>
                    <span style = {{fontSize : '16.7px'}}>{member.user_name}</span>
                    <span style = {{fontSize : '14px' , margin : '5px 0 0 0', color : 'grey'}}>{member.user_status}</span>
                  </div>
                  {member.group_admin ? (
                    <div style = {{padding : '0 3px' , position : 'absolute' , fontWeight : '600' , right: 0, top : '5px',border : '1.4px solid #1fa052',borderRadius : '4px' ,display : 'flex' ,alignItems : 'center', justifyContent : 'center'}}>
                      <span style = {{fontSize : '12px', color : '#1fa052'}}>Group admin</span>
                    </div>
                  ) : null }
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ProfileSection;
