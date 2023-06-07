import Brand from "@/models/Brand";
import Product from "@/models/Product";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { _id } = req.query;

    try {
      // Check if there are any associated products
      const productsCount = await Product.countDocuments({ brand: _id });

      if (productsCount > 0) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Cannot delete brand. Associated products exist",
          });
      }

      // Delete the brand
      const brand = await Brand.findByIdAndDelete(_id);

      if (!brand) {
        return res
          .status(404)
          .json({ success: false, error: "Brand not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Brand deleted successfully" });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);
