import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'
import axiosInstance from "../../axios/axiosInstance";

const initialState = {
    token: localStorage.getItem("token") || null,
    userProfile: null,

    loading: false,
    error: null
}

export const login = createAsyncThunk("auth/login", async(body, thunkAPI) => {
    try{
        const { data } = await axios.post(`https://fitness-project-pswv.onrender.com/api/fitness/v1/panelUser/adminLogin`, body);
        console.log("logindata",data);

        if(data.status === "success"){
            const payload = jwtDecode(data.token)
            localStorage.setItem("token", data.token);
            localStorage.setItem('userId', payload.id)
            window.location.href = "/"
        }
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching user:", error);
        throw error;
    }
})

export const getAdminProfile = createAsyncThunk("auth/getAdminProfile", async(_, thunkAPI) => {
    try{
        const { data } = await axiosInstance.get(`/panelUser`);
        console.log("profiledata",data);

        return data.data.user;
        
    }
    catch(error){
        console.error("Error fetching user:", error);
        throw error;
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
            window.location.href = "/giris-yap";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getAdminProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
            })
            .addCase(getAdminProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setSelectedUser, logout } = authSlice.actions;

export default authSlice.reducer;
