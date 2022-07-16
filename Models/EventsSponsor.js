const mongoose=require('mongoose')



const SponsorSchema=new mongoose.Schema({
    Logo: [Object],
    Name:{
        type: String
    },
    Type: {
        type: String,
        enum: ["Platinum","gold", "silver","media"]
      },  
      
      Event_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},  
}, {
    timestamps:true
})

module.exports=mongoose.model('Sponsors',SponsorSchema)