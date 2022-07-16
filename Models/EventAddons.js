const mongoose=require('mongoose')

const EventAddonsSchema=new mongoose.Schema({
    Name:{
        type: String
    },
    Number:{
        type: Number
    },
    Price:{
        type: String
    } ,
    image: [Object],

    purchased_Addons:{
        type: Number,
        default:0
    },
    NotBought_Addons:{
        type: Number
    },
    Event_id: {type: mongoose.Schema.Types.ObjectId,required:true, ref: 'Event'},  
}, {
    timestamps:true
})

module.exports=mongoose.model('EventAddons',EventAddonsSchema)