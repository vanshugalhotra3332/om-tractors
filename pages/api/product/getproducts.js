import Brand from "@/models/Brand";
import Category from "@/models/Category";
import Product from "@/models/Product";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { search } = req.query;

      const brandQuery = search
        ? { name: { $regex: search, $options: "i" } }
        : {};

      // Fetch brand based on the search query for brand name
      const brands = await Brand.find(brandQuery);
      const brandIds = brands.map((brand) => brand._id);

      const categoryQuery = search
        ? { name: { $regex: search, $options: "i" } }
        : {};

      // Fetch category based on the search query for category name
      const categories = await Category.find(categoryQuery);
      const categoryIds = categories.map((category) => category._id);

      // Create a search query for products using a regular expression
      const productSearchQuery = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { partNumber: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { brand: { $in: brandIds } },
              { category: { $in: categoryIds } },
            ],
          }
        : {};

      // Fetch brands based on the search query
      const products = await Product.find(productSearchQuery)
        .populate("brand", "name")
        .populate("category", "name");

      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDb(handler);
