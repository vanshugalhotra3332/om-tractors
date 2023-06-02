const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "default.svg",
    },
  },
  { timestamps: true, collection: "categories" }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
