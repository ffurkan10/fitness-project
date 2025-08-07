import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { setResultModalData, showModal } from "../modal/ModalSlice";

const initialState = {
    occupiedSlots: [],
    userLessons: [],
    selectedLesson: null,
    loading: false,
    error: null
}

export const getOccupiedSlots = createAsyncThunk("notification/getOccupiedSlots", async(date, thunkAPI) => {
    try{

        const { data } = await axiosInstance.get(`/lesson/occupiedSlots?date=${date}`);
        console.log("Occupied slots data:", data);
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})
   

export const getUserLessons = createAsyncThunk("notification/getUserLessons", async(userId, thunkAPI) => {
    try{
        const { data } = await axiosInstance.get(`/lesson/userLessons/${userId}`);
        console.log("User lessons data:", data);
        
        return data.data;
    }
    catch(error){
        console.error("Error fetching stats:", error);
        throw error;
    }
})

export const createUserLesson = createAsyncThunk("notification/createUserLesson", async(lessonData, thunkAPI) => {
    try{
        const { data } = await axiosInstance.post(`/lesson/`, lessonData);
        console.log("Created lesson data:", data);
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

export const updateUserLesson = createAsyncThunk("notification/updateUserLesson", async({ id, lessonData }, thunkAPI) => {
    try{
        const { data } = await axiosInstance.patch(`/lesson/${id}`, lessonData);
        console.log("Updated lesson data:", data);
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


const lessonSlice = createSlice({
    name: "lesson",
    initialState,
    reducers: {
        setSelectedLesson: (state, action) => {
            state.selectedLesson = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOccupiedSlots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOccupiedSlots.fulfilled, (state, action) => {
                state.loading = false;
                state.occupiedSlots = action.payload;
            })
            .addCase(getOccupiedSlots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getUserLessons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserLessons.fulfilled, (state, action) => {
                state.loading = false;
                state.userLessons = action.payload;
            })
            .addCase(getUserLessons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(createUserLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserLesson.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createUserLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateUserLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.userLessons = state.userLessons.map((lesson) => {
                    if (lesson._id === action.payload._id) {
                        return action.payload;
                    }
                    return lesson;
                })
            })
            .addCase(updateUserLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { setSelectedLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
