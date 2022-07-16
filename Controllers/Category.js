const Category = require("../Models/Category");
const Events = require("../Models/Events");
const fs = require("fs");
const slugify = require("slugify");

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
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      fileName: cate.fileName,
      Descriptions: cate.Descriptions,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
exports.addCategory = async (req, res) => {
  const { filename } = req.file;
  const { name, parentId, Descriptions } = req.body;

  try {
    let category = new Category();
    category.fileName = filename;
    category.name = name;
    category.parentId = parentId;
    category.Descriptions = Descriptions;
    (category.slug = slugify(name)), await category.save();

    res.json({
      successMessage: `${name} a été créé`,
      category,
    });
  } catch (err) {
    res.status(500).json({
      err,
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};

exports.getCategories = async (req, res) => {
  Category.find({})
    .sort({ createdAt: -1 })
    .exec((error, categorie) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (categorie) {
        const categories = createCategories(categorie);
        res.status(200).json({ categories });
      }
    });
};
exports.getEvntCat = async (req, res) => {
  Category.find().forEach(function (newBook) {
    newBook.Events = Events.find({ Scategory: newBook._id }).toArray();
    // db.booksReloaded.insert(newBook);
  });
  res.status(200).json(newBook);
};

exports.ShowEventsparCategory = async (req, res) => {
  await Events.find({ Scategory: req.params.id, Validate: 1 }).exec(
    (error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    }
  );
};

exports.subparCategory = async (req, res) => {
  await Category.find({ parentId: req.params.id }).exec((error, event) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (event) {
      res.status(200).json({ event });
    }
  });
};

exports.ShowAllEventsparCategory = async (req, res) => {
  await Events.find({ Scategory: req.params.id, Validate: 1 })
    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    })
    .sort({ createdAt: -1 });
};

exports.getCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  Category.findById(categoryId).exec((error, category) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (category) {
      res.status(200).json({ category });
    }
  });
};
exports.updateCategories = async (req, res) => {
  const updateData = Object.assign({}, req.body); // Copy req.body in order not to change it
  updateData.fileName = req.file.filename;
  Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateData,
    },
    (error, category) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          successMessage: `Catégorie mise à jour avec succès !`,
          category,
        });
      }
    }
  );
};
exports.deleteCategories = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedCategory = await Category.findByIdAndDelete(itemId);

    fs.unlink(`Client/public/uploads/${deletedCategory.fileName}`, (err) => {
      if (err) throw err;
      console.log(
        "Image successfully deleted from filesystem: ",
        deletedCategory.fileName
      );
    });

    res.status(200).json({ deletedCategory });
  } catch (err) {
    console.log(err, "CategoryController.delete error");
    res.status(500).json({
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};
