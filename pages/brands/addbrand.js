import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

const AddBrand = () => {
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
            Add Brand
          </h2>
          <p className="text-sm text-gray-600 py-1 tracking-wide">
            Register New Brand
          </p>
        </div>
      </div>
      <div className="my-8 brands-card rounded-lg border-2 border-gray-200 border-opacity-70  shadow-sm">
        <div className="input-item">
          <label htmlFor="brandname" className="input-label">
            Brand Name
          </label>
          <input
            type="text"
            className="input-box"
            id="brandname"
            name="brandname"
          />
        </div>
        <div className="input-item">
          <label htmlFor="brandlogo" className="input-label">
            Brand Logo
          </label>
          <div className="upload relative border rounded-md border-[#919eab52] my-4 flex items-center justify-center flex-col py-2 cursor-pointer">
            <input
              type="file"
              className="!w-full h-[100px] opacity-0 relative"
              id="brandlogo"
              name="brandlogo"
            />
            <label
              htmlFor="brandlogo"
              className="image-upload absolute top-0 rounded-md z-[100] cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center my-6">
                <Image
                  alt="Upload"
                  className="w-12 h-12"
                  layout="fixed"
                  width={48}
                  height={48}
                  objectFit="cover"
                  src="/assets/Images/Icons/upload.svg"
                />
                <h4 className="text-gray-900 tracking-wider leading-loose text-sm font-medium">
                  Drag and drop a file to upload
                </h4>
              </div>
            </label>
          </div>
        </div>

        <div className="control-buttons mx-4 my-4">
          <div className="primary-btn bg-orange-400 hover:bg-orange-500">
            Submit
          </div>
          <Link
            href={"/brands/brands"}
            className="primary-btn bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AddBrand;