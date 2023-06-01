import Product from "@/models/Product";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method == "PATCH") {
    const {
      _id,
      name,
      partNumber,
      brand,
      mrp,
      quantity,
      category,
      minQuantity,
      description,
      boxNumber,
      images,
      code,
    } = req.body;

    try {
      const product = await Product.findById(_id);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, error: "product not found" });
      }

      // Update the product fields
      product.name = name ? name : product.name;
      product.partNumber = partNumber ? partNumber : product.partNumber;
      product.brand = brand ? brand : product.brand;
      product.mrp = mrp ? mrp : product.mrp;
      product.quantity = quantity ? quantity : product.quantity;
      product.category = category ? category : product.category;
      product.minQuantity = minQuantity ? minQuantity : product.minQuantity;
      product.images = images ? images : product.images;
      product.code = code ? code : product.code;
      product.description = description ? description : product.description;
      product.boxNumber = boxNumber ? boxNumber : product.boxNumber;

      // Run validators
      await product.validate();

      await product.save();

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
