const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      default: "default.svg",
    },
  },
  { timestamps: true, collection: "brands" }
);

export default mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
