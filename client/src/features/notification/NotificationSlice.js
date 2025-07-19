import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { setResultModalData, showModal } from "../modal/ModalSlice";

const initialState = {
    allNotifications: [],
    loading: false,
    error: null
}

export const getAllNotifications = createAsyncThunk("notification/getAllNotifications", async(_, thunkAPI) => {
    try{

        const { data } = await axiosInstance.get(`/notification/all`);
        
        return data.data.notifications;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

export const sendNotification = createAsyncThunk("notification/sendNotification", async(body, thunkAPI) => {
    try{
        const { data } = await axiosInstance.post(`/notification`, body);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde gönderildi."}));
        }
        
        return data.data.notification;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.allNotifications = action.payload;
            })
            .addCase(getAllNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(sendNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.allNotifications = [ action.payload, ...state.allNotifications];
            })
            .addCase(sendNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {  } = notificationSlice.actions;

export default notificationSlice.reducer;
