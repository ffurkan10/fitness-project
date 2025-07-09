import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

const initialState = {
    lastMonthStats: null,
    allStats: [],
    genderStats: null,
    loading: false,
    error: null
}

export const fetchStats = createAsyncThunk("stats/fetchStats", async(_, thunkAPI) => {
    try{

        const { data } = await axiosInstance.get(`/snapshot/`);
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

export const fetchGenderStats = createAsyncThunk("stats/fetchGenderStats", async(_, thunkAPI) => {
    try{
        const { data } = await axiosInstance.get(`/users/stats/gender`);
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

const statSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading = false;
                state.lastMonthStats = action.payload[action.payload.length - 1];
                state.allStats = action.payload;
            })
            .addCase(fetchStats.rejected, (state, action) => {
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

export const {  } = statSlice.actions;

export default statSlice.reducer;
