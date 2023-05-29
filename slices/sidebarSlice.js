import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  sideBarOpenWidth: "20vw",
  sideBarCloseWidth: "4vw",
  selectedLink: "dashboard",
  image: "/assets/Images/background/eazy.jpg",
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSelectedLink: (state, action) => {
      state.selectedLink = action.payload;
    },
  },
});

export const { open, close, toggle, setSelectedLink } = sidebarSlice.actions;
export default sidebarSlice.reducer;
