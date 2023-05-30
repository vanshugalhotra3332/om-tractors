import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  sideBarOpenWidth: "20vw",
  sideBarCloseWidth: "4vw",
  selectedLink: "dashboard",
  image: "/assets/Images/background/eazy.jpg",
  showProductsSubMenu: false,
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
    toggleProductsSubMenu: (state) => {
      state.showProductsSubMenu = !state.showProductsSubMenu;
    },
  },
});

export const { open, close, toggle, setSelectedLink, toggleProductsSubMenu } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
