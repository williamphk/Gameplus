var express = require("express");
var router = express.Router();

const model = require("../func");

//Load get/post data in JSON form
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", async (req, res) => {
  const products = await model.getNewProducts();
  res.render("index", { title: "Gameplus", products });
});

module.exports = router;
