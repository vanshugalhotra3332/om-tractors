import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { toggle } from "@/slices/sidebarSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  // redux
  const dispatch = useDispatch();

  // redux states
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const sideBarOpenWidth = useSelector(
    (state) => state.sidebar.sideBarOpenWidth
  );
  const sideBarCloseWidth = useSelector(
    (state) => state.sidebar.sideBarCloseWidth
  );
  const windowWidth = useSelector((state) => state.global.windowWidth);

  // local variables
  let marginForSidebar = isSidebarOpen ? sideBarOpenWidth : sideBarCloseWidth;
  marginForSidebar = windowWidth < 768 ? 0 : marginForSidebar;

  return (
    <nav
      className="border-b-2 border-gray-200 border-opacity-60 flex py-4 justify-around"
      style={{ marginLeft: marginForSidebar }}
    >
      {/* menu icon */}
      <div
        className="menu-icon md:hidden inline-block relative self-center"
        onClick={() => {
          dispatch(toggle());
        }}
      >
        <MenuIcon className="h-8 w-8" />
      </div>
      <div className="heading uppercase text-4xl lg:text-5xl font-medium self-center">
        Om Tractors
      </div>
    </nav>
  );
};

export default Navbar;
