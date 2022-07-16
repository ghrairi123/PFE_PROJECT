const mongoose=require('mongoose')

const TicketSchema=new mongoose.Schema({

    Class: {type: mongoose.Schema.Types.ObjectId, ref: 'EventsClass'},  
    Event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    Addons: {type: mongoose.Schema.Types.ObjectId, ref: 'EventAddons'},
      
}, {
    timestamps:true
})

module.exports=mongoose.model('Tickets',TicketSchema)