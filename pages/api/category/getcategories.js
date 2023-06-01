import Category from "@/models/Category";
import connectDb from "@/db/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { search } = req.query;

      // Create a search query using a regular expression
      const searchQuery = search
        ? { name: { $regex: search, $options: "i" } }
        : {};

      // Fetch categories based on the search query
      const categories = await Category.find(searchQuery);
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default connectDb(handler);
