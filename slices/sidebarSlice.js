import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  sideBarOpenWidth: "20vw",
  sideBarCloseWidth: "4vw",
  image: "/assets/Images/background/eazy.jpg",
  showProductsSubMenu: true,
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
    toggleProductsSubMenu: (state) => {
      state.showProductsSubMenu = !state.showProductsSubMenu;
    },
  },
});

export const { open, close, toggle, toggleProductsSubMenu } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
