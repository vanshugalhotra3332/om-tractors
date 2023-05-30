const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    partNumber: { type: String, unique: true, sparse: true, default: null },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      required: true,
    },
    mrp: { type: Number, default: null },
    quantity: { type: Number, default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    alertQuantity: { type: Number, default: 1 },
    description: { type: String },
    boxNumber: { type: String },
    images: [{ type: String }],
    code: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Products ||
  mongoose.model("Products", ProductSchema);
