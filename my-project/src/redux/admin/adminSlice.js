import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminName: null,
        error: false
    },
    reducers: {
        adminLogin : (state,action) =>{
            state.adminName = action.payload;
            state.error = false
        },
        adminLogout : (state) =>{
            state.adminName = null;
        },
        adminLoginFailure: (state,action) =>{
            state.error = action.payload;
        }
    }
});

export const { adminLogin, adminLogout, adminLoginFailure } = adminSlice.actions;
export default adminSlice.reducer;