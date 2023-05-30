import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { motion } from "framer-motion";

// redux
import { useSelector, useDispatch } from "react-redux";
import { toggle, toggleProductsSubMenu } from "@/slices/sidebarSlice";

// icons import

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

import CategoryIcon from "@mui/icons-material/Category";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";

const SubMenu = ({ name, MenuIcon, url }) => {
  const router = useRouter();

  const isActiveLink = (pathname) => {
    return router.asPath === pathname;
  };
  return (
    <li>
      <Link
        href={url}
        className={`sidebar-nav-link ${
          isActiveLink(url) ? "sidebar-nav-link-active" : ""
        }`}
      >
        <MenuIcon className="h-6 w-6 min-w-max" />
        <p className="sidebar-nav-link-p">{name}</p>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const router = useRouter();

  const isActiveLink = (pathname) => {
    return router.asPath === pathname;
  };

  // redux
  const dispatch = useDispatch();

  // redux states
  const sideBarOpenWidth = useSelector(
    (state) => state.sidebar.sideBarOpenWidth
  );
  const sideBarCloseWidth = useSelector(
    (state) => state.sidebar.sideBarCloseWidth
  );

  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const image = useSelector((state) => state.sidebar.image);
  const showProductsSubMenu = useSelector(
    (state) => state.sidebar.showProductsSubMenu
  );

  const windowWidth = useSelector((state) => state.global.windowWidth);

  // Animation
  const Sidebar_animation = {
    // system view
    open: {
      width: windowWidth >= "768" ? sideBarOpenWidth : "100vw",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: windowWidth >= "768" ? sideBarCloseWidth : "0vw",
      transition: {
        damping: 40,
      },
    },
  };

  // Local functions

  const linkClick = (event) => {};

  const productsSubMenuList = [
    {
      name: "add product",
      icon: AddBusinessIcon,
      url: "/addproduct",
    },
    {
      name: "product list",
      icon: ChecklistRtlOutlinedIcon,
      url: "/products",
    },
    {
      name: "category",
      icon: ClassOutlinedIcon,
      url: "/category",
    },
    {
      name: "brands",
      icon: BrandingWatermarkOutlinedIcon,
      url: "/brands",
    },
  ];

  return (
    <>
      {" "}
      <div
        className={`sidebar 
  } inline-block overflow-y-auto fixed flex-1 left-0 top-0 max-h-screen shadow-lg z-[10000] overflow-x-hidden scrollbar-thin`}
      >
        <motion.div
          variants={Sidebar_animation}
          animate={isOpen ? "open" : "closed"}
          className="bg-white text-gray shadow-xl z-[10000] w-full min-h-screen"
        >
          {/* Menus */}
          <div className="flex flex-col h-full">
            {/* user details */}

            <div className="user-details inline-flex justify-center flex-col items-center mt-4 border-b-2 border-gray-200 border-opacity-60">
              <div className="user-icon relative w-56 h-40">
                <Image
                  alt="User"
                  className=""
                  fill
                  style={{ objectFit: "cover" }}
                  src={image}
                />
              </div>
            </div>

            <div className="list-content py-2">
              <ul className="sidebar-nav-list">
                {/* dashboard */}
                <li>
                  <Link
                    href={"/"}
                    className={`sidebar-nav-link ${
                      isActiveLink("/") ? "sidebar-nav-link-active" : ""
                    }`}
                    onClick={linkClick}
                    id="dashboard"
                  >
                    <DashboardOutlinedIcon className="h-6 w-6 min-w-max" />
                    <p className="sidebar-nav-link-p">Dashboard</p>
                  </Link>
                </li>

                {/* Products */}
                <li>
                  <div
                    className={`sidebar-nav-link`}
                    onClick={(event) => {
                      linkClick(event);
                      dispatch(toggleProductsSubMenu());
                    }}
                    id="products"
                  >
                    <CategoryIcon className="h-6 w-6 min-w-max" />
                    <p className="sidebar-nav-link-p">Products</p>
                    <KeyboardArrowDownOutlinedIcon
                      className={` ${
                        showProductsSubMenu && "rotate-180"
                      } duration-200 ml-auto`}
                      onClick={(event) => {
                        dispatch(toggleProductsSubMenu());
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    />
                  </div>
                </li>
                <motion.ul
                  animate={
                    showProductsSubMenu
                      ? {
                          height: "fit-content",
                        }
                      : {
                          height: 0,
                        }
                  }
                  className={`flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden ${
                    isOpen ? "" : "hidden"
                  }`}
                >
                  {productsSubMenuList.map(({ name, icon, url }) => {
                    return (
                      <SubMenu
                        key={name}
                        name={name}
                        MenuIcon={icon}
                        url={url}
                      />
                    );
                  })}
                </motion.ul>

                {/* inventory */}
                <li>
                  <Link
                    href={"/inventory"}
                    className={`sidebar-nav-link ${
                      isActiveLink("/inventory")
                        ? "sidebar-nav-link-active"
                        : ""
                    }`}
                    onClick={linkClick}
                    id="inventory"
                  >
                    <Inventory2OutlinedIcon className="h-6 w-6 min-w-max" />
                    <p className="sidebar-nav-link-p">Inventory</p>
                  </Link>
                </li>
                {/* store record */}
                <li>
                  <Link
                    href={"/store"}
                    className={`sidebar-nav-link ${
                      isActiveLink("/store") ? "sidebar-nav-link-active" : ""
                    }`}
                    onClick={linkClick}
                    id="store"
                  >
                    <StoreOutlinedIcon className="h-6 w-6 min-w-max" />
                    <p className="sidebar-nav-link-p">Store Record</p>
                  </Link>
                </li>
                {/* order book */}
                <li>
                  <Link
                    href={"/orderbook"}
                    className={`sidebar-nav-link ${
                      isActiveLink("/orderbook")
                        ? "sidebar-nav-link-active"
                        : ""
                    }`}
                    onClick={linkClick}
                    id="orderbook"
                  >
                    <BorderColorOutlinedIcon className="h-6 w-6 min-w-max" />
                    <p className="sidebar-nav-link-p">Order Book</p>
                  </Link>
                </li>
                {/* record book */}
                <li>
                  <Link
                    href={"/recordbook"}
                    className={`sidebar-nav-link ${
                      isActiveLink("/recordbook")
                        ? "sidebar-nav-link-active"
                        : ""
                    }`}
                    onClick={linkClick}
                    id="recordbook"
                  >
                    <EventNoteOutlinedIcon className="h-6 w-6 min-w-max" />
                    <p className="sidebar-nav-link-p">Record Book</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* back button */}

          <motion.div
            onClick={() => {
              dispatch(toggle());
            }}
            animate={
              isOpen
                ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    x: 5,
                    rotate: 180,
                  }
            }
            transition={{ duration: 0 }}
            className="absolute w-fit h-fit  z-50 right-2 bottom-3 cursor-pointer"
          >
            <ArrowBackIosOutlinedIcon className="h-6 w-6 mr-2" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;
