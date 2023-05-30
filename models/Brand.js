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
    },
  },
  { timestamps: true }
);

export default mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
