import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../features/profile-section/profile";
import userSlice  from "../features/user/user";
import messageSlice from  '../features/messages/messages.js'
import groupSlice from '../features/groups/groups.js'

export default configureStore({
  reducer: {
    profile: profileSlice,
    user : userSlice, 
    messages : messageSlice , 
    groups : groupSlice
  },
});
