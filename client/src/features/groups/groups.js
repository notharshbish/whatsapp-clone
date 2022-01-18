import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groups : [] , 
    currentGroup : null , 
    grpMessages : [] , 
    users : []
}

const groupSlice = createSlice({
    name : 'groups' , 
    initialState , 
    reducers : {
        setGroups : (state,action) => {
            state.groups = action.payload
        } , 
        setCurrentGroup : (state,action) => {
            state.currentGroup = action.payload
        } , 
        setGrpMessages : (state,action) => {
            state.grpMessages = action.payload
        } , 
        setGrpUsers : (state,action) => {
            state.users = action.payload
        }
    }
})

export const {setGroups, setCurrentGroup, setGrpMessages,setGrpUsers} = groupSlice.actions

export const selectGroups = (state) => state.groups.groups

export const selectCurrentGroup = (state) => state.groups.currentGroup

export const selectGrpMessages = (state) => state.groups.grpMessages

export const selectGrpUsers = (state) => state.groups.users

export default groupSlice.reducer