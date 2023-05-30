const mongoose = require("mongoose");

const BrandsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Brands || mongoose.model("Brands", BrandsSchema);
