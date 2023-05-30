import Brand from "@/models/Brand";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { _id } = req.query;

    try {
      // Find the brand by id and delete it
      const brand = await Brand.findByIdAndDelete(_id);

      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Brand deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
