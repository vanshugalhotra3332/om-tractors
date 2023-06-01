import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// db
import mongoose from "mongoose";
import Category from "@/models/Category";

// Icons import
import { Add } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "@/utils/dbFuncs";

const Categories = ({ fetchedCategories }) => {
  const router = useRouter();

  // local states
  const [categories, setCategories] = useState(fetchedCategories);
  const [searchQuery, setSearchQuery] = useState("");

  // REACT STUFF
  useEffect(() => {
    const fetchResults = async () => {
      const api = `/api/category/getcategories?search=${searchQuery}`;
      const results = await fetchData(api);
      setCategories(results);
    };

    fetchResults();
  }, [searchQuery]);

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

  // local functions

  const handleDelete = async (_id) => {
    const id = _id;

    try {
      const response = await fetch(`/api/category/deletecategory?_id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setCategories((prevCategory) =>
          prevCategory.filter((category) => category._id !== id)
        );

        toast.success(data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Perform any necessary UI updates or actions after successful deletion
      } else {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdate = async (_id, name, image) => {
    router.push(
      `/category/addcategory?_id=${_id}&encodedName=${encodeURIComponent(
        name
      )}&image=${image}`
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="py-8 px-8" style={{ marginLeft: marginForSidebar }}>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="top flex items-center justify-between">
        <div className="left">
          <h2 className="text-xl text-gray-900 font-medium tracking-wide leading-snug">
            Category List
          </h2>
          <p className="text-sm text-gray-600 py-1 tracking-wide">
            Manage Your Categories
          </p>
        </div>
        <Link className="right-btn icon-btn" href={"/category/addcategory"}>
          <Add className="w-6 h-6 text-white font-medium" />
          <span className="text-white font-medium px-2 text-lg">
            Add Category
          </span>
        </Link>
      </div>
      <div className="my-8 brands-card rounded-lg border-2 border-gray-200 border-opacity-70 pb-8 shadow-sm">
        <div className="top-section py-6 px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="search-bar">
            <SearchOutlinedIcon className="inline-flex text-gray-500 rounded-full cursor-pointer mx-2 up-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-bar-input"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="action-buttons space-x-2 py-4 space-y-2">
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
        <div className="brands-list px-4">
          <div className="relative overflow-x-auto">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(({ _id, name, image }) => {
                    return (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={_id}
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checkbox-table-search-1"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <Image
                            alt="Upload"
                            className="w-16 h-16"
                            layout="fixed"
                            width={58}
                            height={58}
                            objectFit="cover"
                            src={`/assets/images/category/${image}`}
                          />
                        </th>
                        <td className="px-6 py-4">{name}</td>
                        <td className="px-6 py-4 md:space-x-4 space-x-0 space-y-2">
                          <div
                            className="inline-block text-gray-900 up-icon hover:text-black"
                            onClick={() => {
                              handleUpdate(_id, name, image);
                            }}
                          >
                            <BorderColorOutlinedIcon className="normal-icon" />
                          </div>
                          <div className="inline-block text-red-500 up-icon hover:text-red-700">
                            <DeleteOutlineOutlinedIcon
                              className="normal-icon"
                              onClick={() => {
                                handleDelete(_id);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// server side rendering
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const categories = await Category.find({});

  return {
    props: {
      fetchedCategories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

export default Categories;