const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    partNumber: { type: String, unique: true, sparse: true, default: null },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      required: true,
    },
    mrp: { type: Number, default: null },
    quantity: { type: Number, default: null },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    minQuantity: { type: Number, default: 1 },
    description: { type: String, default: "" },
    boxNumber: { type: String, default: "" },
    images: [{ type: String }],
    code: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
