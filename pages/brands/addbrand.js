import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// utility funcs
import { postData } from "../../utils/dbFuncs";
import { uploadFileToServer, raiseToast } from "@/utils/utilityFuncs";
import InputContainer from "@/components/FormItems/InputContainer";

const AddBrand = () => {
  const router = useRouter();

  // url query
  const { _id, encodedName, logo } = router.query;
  const name = decodeURIComponent(encodedName);

  // local states
  const [brandName, setBrandName] = useState(encodedName ? name : "");
  const [brandLogo, setBrandLogo] = useState({ name: logo });

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
    setBrandLogo(file);
    uploadFileToServer(file, "brands");
  }

  const submit = async () => {
    if (!brandName) {
      raiseToast("error", "Please Provide Brand Name!!");
    } else {
      const data = {
        name: brandName,
        logo: brandLogo ? brandLogo.name : "",
      };

      // for new brand add
      let METHOD = "POST";
      let api = "/api/brands/addbrand";
      if (_id) {
        // if it is an update request
        METHOD = "PATCH";
        api = "/api/brands/updatebrand";
        data._id = _id;
      }

      const response = await postData(METHOD, data, api);
      if (response.success) {
        let message = _id
          ? "Brand Updated Successfully!!"
          : "Brand Registered Successfully!!";
        raiseToast("success", message);
        setTimeout(() => {
          router.push("/brands/brands");
        }, 1500);
      } else {
        raiseToast("info", "Brand Already Registered!!");
      }
    }
  };

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
      <div className="my-8 brands-card rounded-lg border-2 py-2 pb-4 border-gray-200 border-opacity-70  shadow-sm">
        <InputContainer
          label={"Brand Name"}
          value={brandName}
          onChange={(event) => {
            setBrandName(event.target.value);
          }}
        />
        <div className="input-item">
          <label htmlFor="brandlogo" className="input-label">
            Brand Logo
          </label>
          <div className="upload relative border rounded-md border-[#919eab52] my-4 flex items-center justify-center flex-col py-2 cursor-pointer  transition-all duration-100 ease-in hover:bg-gray-100">
            <input
              type="file"
              className="!w-full h-[100px] opacity-0 relative"
              id="brandlogo"
              name="brandlogo"
              onChange={(event) => {
                if (event.target.files) {
                  const file = event.target.files[0];
                  handleFileUpload(file);
                }
              }}
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

        {brandLogo.name && (
          <div className="image-show py-4 px-6">
            <Image
              alt="Show"
              className="w-24 h-24"
              layout="fixed"
              width={48}
              height={48}
              objectFit="cover"
              src={`/assets/images/brands/${brandLogo.name}`}
            />
            <span className="px-2 text-base tracking-wide leading-loose text-gray-900">
              {brandLogo.name}
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
