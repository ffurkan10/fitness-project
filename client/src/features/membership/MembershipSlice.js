import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setResultModalData, showModal } from "../modal/ModalSlice";
import axiosInstance from "../../axios/axiosInstance";

const initialState = {

    userMembership: null,

    loading: false,
    error: null
}

export const createMembership = createAsyncThunk("membership/createMembership", async(body, thunkAPI) => {
    try{
        const { data } = await axiosInstance.post(`/membership/`, body);

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
 
export const updateMembership = createAsyncThunk("membership/updateMembership", async({id, body}, thunkAPI) => {
    try{

        const { data } = await axiosInstance.patch(`/membership/${id}`, body);

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

export const getUserMembership = createAsyncThunk("membership/getUserMembership", async(id, thunkAPI) => {
    try{
        const { data } = await axiosInstance.get(`/membership/${id}`);
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

const membershipSlice = createSlice({
    name: "membership",
    initialState,
    reducers: {
       setMembershipValues: (state, action) => {
            const { name, value } = action.payload;
            state.memberShipValues[name] = value;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMembership.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMembership.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createMembership.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateMembership.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMembership.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateMembership.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getUserMembership.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserMembership.fulfilled, (state, action) => {
                state.loading = false;
                state.userMembership = action.payload;
            })
            .addCase(getUserMembership.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setMembershipValues } = membershipSlice.actions;

export default membershipSlice.reducer;
