import Category from "@/models/Category";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { _id } = req.query;

    try {
      // Find the Category by id and delete it
      const category = await Category.findByIdAndDelete(_id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, error: "category not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "category deleted successfully" });
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
