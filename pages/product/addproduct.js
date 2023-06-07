import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// db
import mongoose from "mongoose";
import Brand from "@/models/Brand";
import Category from "@/models/Category";

// utility funcs
import { postData } from "../../utils/dbFuncs";
import { uploadFileToServer, raiseToast } from "@/utils/utilityFuncs";
import InputContainer from "@/components/FormItems/InputContainer";
import { DropdownForId, Dropdown } from "@/components/FormItems/Dropdown";

const AddProduct = ({ fetchedBrands, fetchedCategories }) => {
  const router = useRouter();

  // Access the query parameters from the router object
  const {
    encoded__id,
    encoded_name,
    encoded_partNumber,
    encoded_brandID,
    encoded_brandName,
    encoded_mrp,
    encoded_quantity,
    encoded_unit,
    encoded_categoryID,
    encoded_categoryName,
    encoded_minQuantity,
    encoded_description,
    encoded_boxNumber,
    encoded_images,
    encoded_code,
  } = router.query;

  const _id = decodeURIComponent(encoded__id ?? "");
  const decoded_name = decodeURIComponent(encoded_name ?? "");
  const decoded_partNumber = decodeURIComponent(encoded_partNumber ?? "");
  const decoded_brandID = decodeURIComponent(encoded_brandID ?? "");
  const decoded_brandName = decodeURIComponent(encoded_brandName ?? "");
  const decoded_mrp = decodeURIComponent(encoded_mrp ?? "");
  const decoded_quantity = decodeURIComponent(encoded_quantity ?? "");
  const decoded_unit = decodeURIComponent(encoded_unit ?? "PC");
  const decoded_categoryID = decodeURIComponent(encoded_categoryID ?? "");
  const decoded_categoryName = decodeURIComponent(encoded_categoryName ?? "");
  const decoded_minQuantity = decodeURIComponent(encoded_minQuantity ?? "");
  const decoded_description = decodeURIComponent(encoded_description ?? "");
  const decoded_boxNumber = decodeURIComponent(encoded_boxNumber ?? "");
  const decoded_code = decodeURIComponent(encoded_code ?? "");
  const decoded_images = decodeURIComponent(encoded_images ?? "");

  // local variables
  const units = ["PC", "Box"];

  // local states
  const [productName, setProductName] = useState(decoded_name ?? "");
  const [partNumber, setPartNumber] = useState(decoded_partNumber ?? "");

  const [brand, setBrand] = useState(
    decoded_brandName !== "" ? decoded_brandName : "Select Brand"
  ); // just for showCase
  const [brandId, setBrandId] = useState(decoded_brandID ?? ""); //  real data
  const [mrp, setMrp] = useState(decoded_mrp !== "null" ? decoded_mrp : "");

  const [quantity, setQuantity] = useState(
    decoded_quantity !== "null" ? decoded_quantity : ""
  );

  const [unit, setUnit] = useState(decoded_unit);

  const [category, setCategory] = useState(
    decoded_categoryName !== "" ? decoded_categoryName : "Select Category"
  ); // just for showcase
  const [categoryId, setCategoryId] = useState(decoded_categoryID ?? ""); // real data

  const [minQuantity, setMinQuantity] = useState(decoded_minQuantity ?? "");
  const [description, setDescription] = useState(decoded_description ?? "");
  const [boxNumber, setBoxNumber] = useState(
    decoded_boxNumber !== "null" ? decoded_boxNumber : ""
  );
  const [images, setImages] = useState(
    decoded_images ? [{ name: decoded_images }] : [{ name: "default.svg" }]
  );
  const [code, setCode] = useState(decoded_code !== "null" ? decoded_code : "");

  const [showBrands, setShowBrands] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUnit, setShowUnit] = useState(false);

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

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };
  const toggleBrands = () => {
    setShowBrands(!showBrands);
  };

  const toggleUnits = () => {
    setShowUnit(!showUnit);
  };

  function handleFileUpload(file) {
    setImages([file]);
    uploadFileToServer(file, "products");
  }

  const submit = async () => {
    if (!productName) {
      raiseToast("error", "Please Provide Product Name!!");
    } else {
      const data = {
        name: productName,
        partNumber: partNumber,
        brand: brandId,
        mrp: mrp ? Number(mrp) : null,
        quantity: quantity ? Number(quantity) : null,
        unit: unit,
        category: categoryId,
        minQuantity: Number(minQuantity),
        description: description ? description : "",
        boxNumber: boxNumber ? boxNumber : null,
        images: images ? [images[0].name] : ["default.svg"],
        code: code ? code : null,
      };

      // for new brand add
      let METHOD = "POST";
      let api = "/api/product/addproduct";
      if (_id) {
        // if it is an update request
        METHOD = "PATCH";
        api = "/api/product/updateproduct";
        data._id = _id;
      }
      const response = await postData(METHOD, data, api);
      if (response.success) {
        let message = _id
          ? "Product Updated Successfully!!"
          : "Product Added Successfully!!";
        raiseToast("success", message);
        setTimeout(() => {
          router.push("/product/products");
        }, 1500);
      } else {
        raiseToast("info", "Product Already Exists!!");
      }
    }
  };

  return (
    <section className="py-8 px-8" style={{ marginLeft: marginForSidebar }}>
      <div className="top flex items-center justify-between">
        <div className="left">
          <h2 className="text-xl text-gray-900 font-medium tracking-wide leading-snug">
            Add Product
          </h2>
          <p className="text-sm text-gray-600 py-1 tracking-wide">
            Create New Product
          </p>
        </div>
      </div>
      <div className="my-8 brands-card rounded-lg border-2 py-2 pb-4 border-gray-200 border-opacity-70  shadow-sm">
        <div className="inputs grid grid-cols-3">
          {/* product name */}
          <InputContainer
            label={"Product Name"}
            value={productName}
            onChange={(event) => {
              setProductName(event.target.value);
            }}
            fullWidth={true}
          />

          {/* part number */}
          <InputContainer
            label={"Part Number"}
            value={partNumber}
            onChange={(event) => {
              setPartNumber(event.target.value);
            }}
            fullWidth={true}
          />
          {/* brand */}
          <DropdownForId
            label={"Brand"}
            toggleDropDown={toggleBrands}
            value={brand}
            isOpen={showBrands}
            options={fetchedBrands}
            setOption={setBrand}
            setOptionID={setBrandId}
          />

          {/* categories*/}
          <DropdownForId
            label={"Category"}
            toggleDropDown={toggleCategories}
            value={category}
            isOpen={showCategories}
            options={fetchedCategories}
            setOption={setCategory}
            setOptionID={setCategoryId}
          />

          {/* MRP*/}
          <InputContainer
            label={"MRP (₹)"}
            value={mrp}
            onChange={(event) => {
              setMrp(event.target.value);
            }}
            fullWidth={true}
          />

          {/* quantity*/}
          <InputContainer
            label={"Quantity"}
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            fullWidth={true}
          />

          {/* Unit */}
          <Dropdown
            label={"Unit"}
            toggleDropDown={toggleUnits}
            value={unit}
            isOpen={showUnit}
            options={units}
            setOption={setUnit}
          />

          {/* description*/}
          <div className="input-item w-full col-span-3">
            <label htmlFor="description" className="input-label">
              Description
            </label>

            <textarea
              name="description"
              id="description"
              rows="4"
              className="input-box !w-full"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </div>

          {/* minQuantity*/}
          <InputContainer
            label={"Minimum Quantity"}
            value={minQuantity}
            onChange={(event) => {
              setMinQuantity(event.target.value);
            }}
            fullWidth={true}
          />

          {/* code*/}
          <InputContainer
            label={"Code"}
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
            fullWidth={true}
          />
          {/* box number*/}
          <InputContainer
            label={"Box Number"}
            value={boxNumber}
            onChange={(event) => {
              setBoxNumber(event.target.value);
            }}
            fullWidth={true}
          />

          <div className="input-item col-span-3">
            <label htmlFor="images" className="input-label">
              Product Images
            </label>
            <div className="upload relative border rounded-md border-[#919eab52] my-4 flex items-center justify-center flex-col py-2 cursor-pointer  transition-all duration-100 ease-in hover:bg-gray-100">
              <input
                type="file"
                className="!w-full h-[100px] opacity-0 relative"
                id="images"
                name="images"
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

          {images[0].name && (
            <div className="image-show py-4 px-6">
              <Image
                alt="Show"
                className="w-24 h-24"
                layout="fixed"
                width={48}
                height={48}
                objectFit="cover"
                src={`/assets/images/products/${images[0].name}`}
              />
              <span className="px-2 text-base tracking-wide leading-loose text-gray-900">
                {images[0].name}
              </span>
            </div>
          )}
        </div>

        <div className="control-buttons mx-4 my-4">
          <div
            className="primary-btn bg-orange-400 hover:bg-orange-500"
            onClick={submit}
          >
            Submit
          </div>
          <Link
            href={"/product/products"}
            className="primary-btn bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </Link>
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

  const brands = await Brand.find({});
  const categories = await Category.find({});

  return {
    props: {
      fetchedBrands: JSON.parse(JSON.stringify(brands)),
      fetchedCategories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

export default AddProduct;
