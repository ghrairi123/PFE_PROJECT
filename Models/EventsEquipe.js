const mongoose=require('mongoose')


const EquipeSchema=new mongoose.Schema({
    FirstName: {
        type:String
        },
    Photo: [Object],
    Lastname: {
        type:String
        },
    JobName: {
        type:String
        },
    Description: {
        type:String
        },
        Event_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},  

        
}, {
        timestamps:true
})
    
    module.exports=mongoose.model('EventEquipe',EquipeSchema)