import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setResultModalData, showModal } from "../modal/ModalSlice";
import axiosInstance from "../../axios/axiosInstance";

const initialState = {

    userNutrition: null,

    loading: false,
    error: null
}

export const createNutrition = createAsyncThunk("nutrition/createNutrition", async(body, thunkAPI) => {
    try{
        const { data } = await axiosInstance.post(`/nutrition/`, body);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde eklendi."}));
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

export const updateNutrition = createAsyncThunk("nutrition/updateNutrition", async(body, thunkAPI) => {
    try{
        const { data } = await axiosInstance.patch(`/nutrition/`, body);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde güncellendi."}));
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

export const getUserNutrition = createAsyncThunk("nutrition/getUserNutrition", async(id, thunkAPI) => {
    try{
        const { data } = await axiosInstance.get(`/nutrition/${id}`);
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

const nutritionSlice = createSlice({
    name: "nutrition",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNutrition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNutrition.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createNutrition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateNutrition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNutrition.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateNutrition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getUserNutrition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserNutrition.fulfilled, (state, action) => {
                state.loading = false;
                state.userNutrition = action.payload;
            })
            .addCase(getUserNutrition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setMembershipValues } = nutritionSlice.actions;

export default nutritionSlice.reducer;
