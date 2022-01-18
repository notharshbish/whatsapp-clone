import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages : []
}

const messageSlice = createSlice({
    initialState,
    name : 'messages' , 
    reducers : {
        setMessages : (state, action) => {
            state.messages = action.payload
        }
    }
})

export default messageSlice.reducer

export const {setMessages} = messageSlice.actions

export const selectMessages = (state) => state.messages.messages