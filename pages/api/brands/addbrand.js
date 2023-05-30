import Brand from "@/models/Brand";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let brand = new Brand(req.body);
    await brand.save();

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
