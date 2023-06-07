import Product from "@/models/Product";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { _id } = req.query;

    try {
      // Find the Product by id and delete it
      const product = await Product.findById(_id);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, error: "Product not found" });
      }
      res.status(200).json({ success: true, product });
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
