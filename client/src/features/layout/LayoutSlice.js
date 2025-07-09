import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //! seçili input name
  activeSelect: "",

  //! hesap bilgileri açılıp kapanması
  isOpenAccount: false,

};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setActiveSelect: (state, action) => {
      state.activeSelect = action.payload;
    },
    setIsOpenAccount: (state, action) => {
      state.isOpenAccount = action.payload;
    }
  },
});

export const { setActiveSelect, setIsOpenAccount } = layoutSlice.actions;

export default layoutSlice.reducer;