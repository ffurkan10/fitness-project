import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setResultModalData, showModal } from "../modal/ModalSlice";
import axiosInstance from "../../axios/axiosInstance";

const initialState = {
    userBody: null,

    loading: false,
    error: null
}

export const createBodyFeatures = createAsyncThunk("bodyFeature/createBodyFeatures", async(body, thunkAPI) => {
    try{
        const { data } = await axiosInstance.post(`/bodyFeature/`, body);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde eklendi."}));
        }
        
        return data.data;
    }
    catch(error){
        thunkAPI.dispatch(showModal("result"));
        thunkAPI.dispatch(setResultModalData({resultType: "error", message: "Bir hata oluştu."}));
        console.error("Error fetching stats:", error);
        throw error;
    }
})

export const updateBodyFeatures = createAsyncThunk("bodyFeature/updateBodyFeatures", async(body, thunkAPI) => {
    try{
        const { data } = await axiosInstance.patch(`/bodyFeature/`, body);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde güncellendi."}));
        }
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        thunkAPI.dispatch(showModal("result"));
        thunkAPI.dispatch(setResultModalData({resultType: "error", message: "Bir hata oluştu."}));
        throw error;
    }
})

export const getUserBody = createAsyncThunk("bodyFeature/getUserBody", async(id, thunkAPI) => {
    try{
        const { data } = await axiosInstance.get(`/bodyFeature/${id}`);
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

const bodyFeatureSlice = createSlice({
    name: "bodyFeature",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                createBodyFeatures.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createBodyFeatures.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(
                createBodyFeatures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateBodyFeatures.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBodyFeatures.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateBodyFeatures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getUserBody.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserBody.fulfilled, (state, action) => {
                state.loading = false;
                state.userBody = action.payload;
            })
            .addCase(getUserBody.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setMembershipValues } = bodyFeatureSlice.actions;

export default bodyFeatureSlice.reducer;