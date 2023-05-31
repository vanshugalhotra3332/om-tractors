import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// Icons import
import { Add } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

const Brands = () => {
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
    <section className="py-8 px-8" style={{ marginLeft: marginForSidebar }}>
      <div className="top flex items-center justify-between">
        <div className="left">
          <h2 className="text-xl text-gray-900 font-medium tracking-wide leading-snug">
            Brand List
          </h2>
          <p className="text-sm text-gray-600 py-1 tracking-wide">
            Manage Your Brands
          </p>
        </div>
        <Link className="right-btn icon-btn" href={"/brands/addbrand"}>
          <Add className="w-6 h-6 text-white font-medium" />
          <span className="text-white font-medium px-2 text-lg">Add Brand</span>
        </Link>
      </div>
      <div className="my-8 brands-card rounded-lg border-2 border-gray-200 border-opacity-70  shadow-sm">
        <div className="top-section py-6 px-4 flex justify-between items-center">
          <div className="search-bar">
            <SearchOutlinedIcon className="inline-flex text-gray-500 rounded-full cursor-pointer mx-2 transition-all duration-200 ease-out hover:-translate-y-[.5px]" />
            <input
              type="text"
              placeholder="Search..."
              className="search-bar-input"
            />
          </div>
          <div className="action-buttons space-x-2">
            <div className="filter-btn">
              <TuneOutlinedIcon className="w-5 h-5" />
              <span className="text-base capitalize ml-3">Filter</span>
            </div>
            <div className="pdf-btn">
              <PictureAsPdfOutlinedIcon className="w-5 h-5" />
              <span className="text-base uppercase ml-3">PDF</span>
            </div>
            <div className="csv-btn">
              <FormatListBulletedOutlinedIcon className="w-5 h-5" />
              <span className="text-base uppercase ml-3">CSV</span>
            </div>
          </div>
        </div>
        <div className="brands-list"></div>
      </div>
    </section>
  );
};

export default Brands;
