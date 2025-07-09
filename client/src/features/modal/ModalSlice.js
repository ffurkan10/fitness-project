import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalType: null,
    nestedModalType : null,
    modalLocation: null,

    resultModalData: null
}


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal: (state, action) => {
            state.modalType = action.payload
            state.modalLocation = window.location.pathname
        },
        setResultModalData: (state, action)=> {
            state.resultModalData = action.payload
        },
        showNestedModal: (state, action) => {
            state.nestedModalType = action.payload
            state.modalLocation = window.location.pathname
        },
        closeAllModal: (state)=> {
            state.modalType = null
            state.nestedModalType = null
        },
        clearModalState: (state) => {
            return initialState
        }
    },
})


export const {showModal, showNestedModal,closeAllModal,clearModalState, setResultModalData} = modalSlice.actions
export default modalSlice.reducer