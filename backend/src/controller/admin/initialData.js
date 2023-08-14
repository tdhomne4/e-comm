const Category = require("../../models/category");
const Product = require("../../models/product");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate.id,
      name: cate.name,
      slug: cate.slug,
      type: cate.type,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.initialData = async (req, res) => {
  const key = req.params.key;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 2;
  const skip = (page - 1) * limit;
  // console.log(page, limit);

  const categories = await Category.find({}).exec();
  let products;
  let total;
  const query = {
    $or: [
      !isNaN(parseInt(key))
        ? {
            price: parseInt(key),
          }
        : {
            name: { $regex: new RegExp(key, "i") },
          },
      {
        description: { $regex: new RegExp(key, "i") },
      },
    ],
  };
  if (key) {
    // products = await Product.find({query});
    [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).skip(skip).limit(limit),
    ]);
  } else {
    total = await Product.countDocuments();
    products = await Product.find({})
      .skip(skip)
      .limit(limit)
      .select(
        "_id name price quantity slug description productPictures category"
      )
      .populate({ path: "category", select: "_id name" }) //chanini means calling multiple func, fetch data from  foreign key
      .exec();
  }

  res.status(200).json({
    categories: createCategories(categories),
    products,
    page,
    limit,
    total,
  });
};

exports.getSearchData = async (req, res) => {
  const key = req.params.key;
  console.log(key);

  const products = await Product.find({
    $or: [
      !isNaN(parseInt(key))
        ? {
            price: parseInt(key),
          }
        : {
            name: { $regex: new RegExp(key, "i") },
          },
      {
        description: { $regex: new RegExp(key, "i") },
      },
    ],
  });
  res.status(200).json({
    products,
  });
};
