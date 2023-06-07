import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

// db
import Product from "@/models/Product";
import mongoose from "mongoose";

const ProductDetails = ({ fetchedProduct }) => {
  const {
    name,
    partNumber,
    brand,
    boxNumber,
    category,
    code,
    description,
    images,
    minQuantity,
    mrp,
    quantity,
    unit,
  } = fetchedProduct;
  // redux states
  const {
    isOpen: isSidebarOpen,
    sideBarOpenWidth,
    sideBarCloseWidth,
  } = useSelector((state) => state.sidebar);
  const { windowWidth } = useSelector((state) => state.global);

  // local variables
  const marginForSidebar = useMemo(() => {
    const sidebarWidth = isSidebarOpen ? sideBarOpenWidth : sideBarCloseWidth;
    return windowWidth < 768 ? 0 : sidebarWidth;
  }, [isSidebarOpen, sideBarOpenWidth, sideBarCloseWidth, windowWidth]);

  const product_fields = [
    {
      title: "Product Name",
      value: name,
    },
    {
      title: "Part Number",
      value: partNumber,
    },
    {
      title: "Brand",
      value: brand.name,
    },
    {
      title: "MRP",
      value: `₹ ${mrp ? mrp : ""}`,
    },
    {
      title: "Quantity",
      value: quantity,
    },
    {
      title: "Unit",
      value: unit,
    },
    {
      title: "Category",
      value: category.name,
    },
    {
      title: "Minimum Quantity",
      value: minQuantity,
    },
    {
      title: "Description",
      value: description,
    },
    {
      title: "Box Number",
      value: boxNumber,
    },
    {
      title: "Code",
      value: code,
    },
  ];

  return (
    <section className="py-8 px-8" style={{ marginLeft: marginForSidebar }}>
      <div className="top flex items-center justify-between">
        <div className="left">
          <h2 className="text-xl text-gray-900 font-medium tracking-wide leading-snug">
            Product Details
          </h2>
          <p className="text-sm text-gray-600 py-1 tracking-wide">
            Full Details of Product
          </p>
        </div>
      </div>
      <div className="my-8 brands-card rounded-lg border border-gray-200 border-opacity-70 pb-8 shadow-sm">
        <div className="product-details outline-none py-8 px-6 border-none flex">
          <ul className="w-2/3 border-b">
            {product_fields.map(({ title, value }, index) => (
              <li
                className={`product-details-item ${
                  index % 2 === 1 ? "bg-gray-100" : ""
                }`}
                key={index}
              >
                <h4 className="product-details-title">{title}</h4>
                <h6 className="product-details-value">{value}</h6>
              </li>
            ))}
          </ul>

          <div className="product-image relative w-1/3 mx-4 flex justify-center rounded-lg border border-gray-200 border-opacity-70 shadow-sm h-[250px]">
            <Image
              alt="Product Image"
              className=""
              layout="fixed"
              objectFit="cover"
              width={150}
              height={150}
              src={`/assets/Images/products/${images[0]}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// server side rendering
export async function getServerSideProps({ query }) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const { _id } = query;

  try {
    const product = await Product.findById(_id)
      .populate("brand", "name")
      .populate("category", "name");
    if (product) {
      return {
        props: {
          fetchedProduct: JSON.parse(JSON.stringify(product)),
        },
      };
    } else {
      return {
        props: {
          fetchedProduct: [],
        },
      };
    }
  } catch (error) {
    return {
      props: {
        fetchedProduct: [],
      },
    };
  }
}

export default ProductDetails;
