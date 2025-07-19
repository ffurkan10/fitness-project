import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setResultModalData, showModal } from "../modal/ModalSlice";
import axiosInstance from "../../axios/axiosInstance";

const initialState = {
    allUsers: [],
    selectedUser: null,

    loading: false,
    error: null
}

export const getAllUsers = createAsyncThunk("user/getAllUsers", async({name}, thunkAPI) => {
    try{
        const { data } = await axiosInstance.get(`/users?name=${name || ""}`);
        
        return data.data.users;
    }
    catch(error){
        console.error("Error fetching user:", error);
        throw error;
    }
})

export const addNewUser = createAsyncThunk("user/addNewUser", async(body, thunkAPI) => {
    try{
        
        const { data } = await axiosInstance.post(`/users/signup`, body);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde oluşturuldu."}));
        }
        
        return data.data.newUser;
    }
    catch(error){
        console.error("Error fetching user:", error);
        throw error;
    }
})

export const deleteUser = createAsyncThunk("user/deleteUser", async(id, thunkAPI) => {
    try{
        
        const { data } = await axiosInstance.delete(`/users/${id}`);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde silindi."}));
        }
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching user:", error);
        throw error;
    }
})

export const fetchGenderStats = createAsyncThunk("stats/fetchGenderStats", async() => {
    try{
        const { data } = await axiosInstance.get(`/users/stats/gender`);
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(addNewUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = [...state.allUsers, action.payload];
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = state.allUsers.filter(user => user._id !== action.payload._id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchGenderStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenderStats.fulfilled, (state, action) => {
                state.loading = false;
                state.genderStats = action.payload;
            })
            .addCase(fetchGenderStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
