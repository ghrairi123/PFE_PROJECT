const mongoose=require('mongoose')

const ClassEventSchema=new mongoose.Schema({
    ClassName:{
        type: String,
        required:true
    },
    Price:{
        type: String,
        required:true
    } ,
      
    Event_id: {type: mongoose.Schema.Types.ObjectId,
        required:true, ref: 'Event'},  
}, {
    timestamps:true
})

module.exports=mongoose.model('EventsClass',ClassEventSchema)