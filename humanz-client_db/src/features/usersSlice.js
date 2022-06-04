import { createSlice } from "@reduxjs/toolkit";

const colTitles = ["Name", "Email", "ID", "Phone", "IP"];

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersArray: [],
        colTitles
    },
    reducers: {
        updateUsers: (state, action) => {
            console.log("action payload");
            state.usersArray = action.payload;
        }
    }
})

export const { updateUsers } = usersSlice.actions;

export const selectUsers = ({ users }) => users;

export default usersSlice.reducer;