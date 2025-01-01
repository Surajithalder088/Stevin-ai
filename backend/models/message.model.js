import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }
},{timestamps:true})

const Message= mongoose.model('Message',messageSchema)

export default Message;