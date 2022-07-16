const Scategory = require("../Models/Sub-category");
const Category = require("../Models/Category");
const slugify = require("slugify");
const fs = require('fs');

exports.create = async(req, res,next) => {
	try {
	const {
		Libelle,
		Descriptions,
		category_id
	} = req.body;	
	const  fileName = req.file.filename;
	const slug= slugify(Libelle);
	//if(!Photo) return res.status(400).json({msg:"Aucune image téléversée"})
	const Souscatgorie=await Scategory.findOne({Libelle})
	if(Souscatgorie) {res.status(400).json({msg:"Sous Catogorie existe déja "})}
	else{
	const newSouscatgorie=new Scategory({Libelle,Descriptions,fileName,slug,category_id})
	//save mongoDB
	await newSouscatgorie.save()
	res.json({successMessage: `${Libelle} a été créé`,
	newSouscatgorie})}	
} catch (err) {
	res.json({errorMessage:err})
}	
};
exports.readAll = async (req, res) => {
	try {
		const subCategory = await Scategory.find({}).populate(
			'Category',
			'Category'
		);

		res.json({ subCategory });
	} catch (err) {
		console.log(err, 'productController.readAll error');
		res.status(500).json({
			errorMessage: 'Veuillez réessayer plus tard',
		});
	}
};
exports.update = async (req, res) => {
	const ScategoryId = req.params.ScategoryId;

	req.body.fileName = req.file.filename;

	const oldSubCategory = await Scategory.findByIdAndUpdate(ScategoryId, req.body);

	fs.unlink(`'Client/public/uploads/${oldSubCategory.fileName}`, err => {
		if (err) throw err;
		console.log('Image supprimée avec succès du système de fichiers');
	});

	res.json({
		successMessage: 'sous-catégorie mise à jour avec succès',
	});
};
exports.deleted = async (req, res) => {
	try {
		const ScategoryId = req.params.ScategoryId;
		const deletedScategory = await Scategory.findByIdAndDelete(ScategoryId);

		fs.unlink(`Client/public/uploads/${deletedScategory.fileName}`, err => {
			if (err) throw err;
			console.log(
				'Image supprimée avec succès du système de fichiers: ',
				deletedScategory.fileName
			);
		});

		res.json(deletedScategory);
	} catch (err) {
		console.log(err, 'Controller.delete error');
		res.status(500).json({
			errorMessage: 'Veuillez réessayer plus tard',
		});
	}
};
exports.read = async (req, res) => {
	try {
		const ScategoryId = req.params.ScategoryId;
		const sCatogory = await Scategory.findById(ScategoryId);

		res.json(sCatogory);
	} catch (err) {
		console.log(err, 'productController.read error');
		res.status(500).json({
			errorMessage: 'Veuillez réessayer plus tard',
		});
	}
};
exports.Show = async (req, res) => {

    const data = [];
    const category = await Category.find();
    const subcategory = await Scategory.find();
    subcategory.forEach(Element => {
        category.forEach(item =>{
            if(item._id.toString() == Element.category_id.toString()){
                const data1 = {
                    categoryname: item.name,
					categoryId: item._id,
					categoryImage: item.fileName,
                    subcategoryname: Element.Libelle,
					subcategoryImage: Element.fileName,
					subcategoryDescription: Element.Descriptions,
                    _id:Element._id
                }
                data.push(data1);
            }
        })
    })
    res.json({ data: data });
};


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
		children: createCategories(categories, cate._id),
	  });
	}
  
	return categoryList;
  }
exports.ShowCatego = async (req, res) => {
    Category.find({}).exec((error, categories) => {
		if (error) return res.status(400).json({ error });
		if (categories) {
		  const categoryList = createCategories(categories);
		  res.status(200).json({ categoryList });
		}
	  });
};

