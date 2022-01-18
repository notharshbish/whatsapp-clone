import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  value: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileSection: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default profileSlice.reducer;

export const { setProfileSection } = profileSlice.actions;

export const selectProfileValue = (state) => state.profile.value;
