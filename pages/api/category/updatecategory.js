import Category from "@/models/Category";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method == "PATCH") {
    const { _id, name, image } = req.body;

    try {
      const category = await Category.findById(_id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, error: "category not found" });
      }

      // Update the category fields
      category.name = name ? name : category.name;
      category.image = image ? image : category.image;

      // Run validators
      await category.validate();
      await category.save();

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);
