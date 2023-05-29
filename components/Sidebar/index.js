import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { close, open } from "@/slices/sidebarSlice";

const Sidebar = () => {
  // redux
  const dispatch = useDispatch();
  dispatch(close());
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return <div>Sidebar</div>;
};

export default Sidebar;
