var express = require("express");
var router = express.Router();

const model = require("../func");

//Load get/post data in JSON form
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/:productId", async (req, res) => {
  const product = await model.getProduct(req.params.productId);
  product.releaseDate = new Date(product.releaseDate).toLocaleDateString(
    "en-US"
  );
  res.render("product-details", { title: product.title, product });
});

router.get("/", async (req, res) => {
  const products = await model.getAllProducts();
  res.render("product-list", { title: "All Products", products });
});

module.exports = router;
