const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    partNumber: {
      type: String,
      unique: true,
      default: "",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    mrp: { type: Number, default: null },
    quantity: { type: Number, default: null },
    unit: { type: String, default: "PC" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    minQuantity: { type: Number, default: 1 },
    description: { type: String, default: "" },
    boxNumber: { type: String, default: "" },
    images: { type: [String], default: ["default.svg"] },
    code: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
