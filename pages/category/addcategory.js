import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// utility funcs
import { postData } from "../../utils/dbFuncs";
import { uploadFileToServer, raiseToast } from "@/utils/utilityFuncs";
import InputContainer from "@/components/FormItems/InputContainer";

const AddCategory = () => {
  const router = useRouter();

  // url query
  const { _id, encodedName, image } = router.query;
  const name = decodeURIComponent(encodedName);

  // local states
  const [categoryName, setCategoryName] = useState(encodedName ? name : "");
  const [categoryImage, setCategoryImage] = useState({ name: image });

  // redux states
  const {
    isOpen: isSidebarOpen,
    sideBarOpenWidth,
    sideBarCloseWidth,
  } = useSelector((state) => state.sidebar);
  const { windowWidth } = useSelector((state) => state.global);

  // local variables
  let marginForSidebar = isSidebarOpen ? sideBarOpenWidth : sideBarCloseWidth;
  marginForSidebar = windowWidth < 768 ? 0 : marginForSidebar;

  // local functions

  function handleFileUpload(file) {
    setCategoryImage(file);
    uploadFileToServer(file, "category");
  }

  const submit = async () => {
    if (!categoryName) {
      raiseToast("error", "Please Provide Category Name!!");
    } else {
      const data = {
        name: categoryName,
        image: categoryImage ? categoryImage.name : "",
      };

      // for new category add
      let METHOD = "POST";
      let api = "/api/category/addcategory";
      if (_id) {
        // if it is an update request
        METHOD = "PATCH";
        api = "/api/category/updatecategory";
        data._id = _id;
      }

      const response = await postData(METHOD, data, api);
      if (response.success) {
        let message = _id
          ? "Category Updated Successfully!!"
          : "Category Created Successfully!!";
        raiseToast("success", message);
        setTimeout(() => {
          router.push("/category/categories");
        }, 1500);
      } else {
        raiseToast("info", "Category Already Exists!!");
      }
    }
  };

  return (
    <section className="py-8 px-8" style={{ marginLeft: marginForSidebar }}>
      <div className="top flex items-center justify-between">
        <div className="left">
          <h2 className="text-xl text-gray-900 font-medium tracking-wide leading-snug">
            Add Category
          </h2>
          <p className="text-sm text-gray-600 py-1 tracking-wide">
            Create New Category
          </p>
        </div>
      </div>
      <div className="my-8 brands-card rounded-lg border-2 py-2 pb-4 border-gray-200 border-opacity-70  shadow-sm">
        <InputContainer
          label={"Category Name"}
          value={categoryName}
          onChange={(event) => {
            setCategoryName(event.target.value);
          }}
        />

        <div className="input-item">
          <label htmlFor="categoryImage" className="input-label">
            Category Image
          </label>
          <div className="upload relative border rounded-md border-[#919eab52] my-4 flex items-center justify-center flex-col py-2 cursor-pointer  transition-all duration-100 ease-in hover:bg-gray-100">
            <input
              type="file"
              className="!w-full h-[100px] opacity-0 relative"
              id="categoryImage"
              name="categoryImage"
              onChange={(event) => {
                if (event.target.files) {
                  const file = event.target.files[0];
                  handleFileUpload(file);
                }
              }}
            />
            <label
              htmlFor="categoryImage"
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

        {categoryImage.name && (
          <div className="image-show py-4 px-6">
            <Image
              alt=""
              className="w-24 h-24"
              layout="fixed"
              width={48}
              height={48}
              objectFit="cover"
              src={`/assets/images/category/${categoryImage.name}`}
            />
            <span className="px-2 text-base tracking-wide leading-loose text-gray-900">
              {categoryImage.name}
            </span>
          </div>
        )}

        <div className="control-buttons mx-4 my-4">
          <div
            className="primary-btn bg-orange-400 hover:bg-orange-500"
            onClick={submit}
          >
            Submit
          </div>
          <Link
            href={"/category/categories"}
            className="primary-btn bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AddCategory;
