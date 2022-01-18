import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userId : null , 
    userName : null , 
    userPhone : null , 
    userPicture : null , 
    userStatus : null ,  
    selectedUser : {
        name : null , 
        pic : null  , 
        status : null , 
        phone  : null 
    }
}


const userSlice = createSlice({
    name : 'user' , 
    initialState , 
    reducers : {
        setUser : (state,action) => {
            state.userId = action.payload.user_id
            state.userName = action.payload.user_name 
            state.userPhone = action.payload.user_phone
            state.userPicture = action.payload.user_picture 
            state.userStatus = action.payload.user_status
            // state.value = action.payload
        } , 
        setSelectedUser : (state,action) => {
            state.selectedUser.name = action.payload.name 
            state.selectedUser.pic = action.payload.pic 
            state.selectedUser.status = action.payload.status
            state.selectedUser.phone = action.payload.phone
        }
    }
})


export default userSlice.reducer

export const {setUser, setSelectedUser} = userSlice.actions

export const selectUser = (state) => state.user.value

export const selectClickedUser = (state) => state.user.selectedUser
