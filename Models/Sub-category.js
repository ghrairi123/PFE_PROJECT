const mongoose=require('mongoose')

const SousCategorieSchema=new mongoose.Schema({

    Libelle:{
        type:String,
        required: true,
    },
    slug: { 
        type: String
    },
    fileName: {
        type: 'String',
        required: true,
    },
    Descriptions:{
          type:String,
          required:true
          }, 
    category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "Category" }
 
},
{
    timestamps:true
})

module.exports=mongoose.model('subcategory',SousCategorieSchema)