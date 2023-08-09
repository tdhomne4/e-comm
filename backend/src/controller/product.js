const Product = require("../models/product");
const Category = require("../models/category");
const slugify = require("slugify");
const shortId = require("shortid");
const product = require("../models/product");

//function createCategories
exports.createProduct = (req, res) => {
  //	res.status(200).json({file : req.files, body : req.body});
  const { name, price, description, quantity, category, createdBy } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (product) {
      return res.status(201).json({ product });
    }
  });
};

exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, cat) => {
      if (error) return res.status(400).json({ error });
      if (cat) {
        Product.find({ category: cat._id }).exec((error, products) => {
          if (error) return res.status(400).json({ error });
          if (products.length > 0) {
            return res.status(200).json({
              products,
              productsByPrice: {
                under5k: products.filter((product) => product.price <= 5000),
                under10k: products.filter(
                  (product) => product.price > 5000 && product.price <= 10000
                ),
                under20k: products.filter(
                  (product) => product.price > 10000 && product.price <= 20000
                ),
                under30k: products.filter(
                  (product) => product.price > 20000 && product.price <= 30000
                ),
              },
            });
          }
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        return res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
