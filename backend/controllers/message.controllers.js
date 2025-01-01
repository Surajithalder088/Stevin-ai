import messageModel from "../models/message.model.js"

export const getMessages=async(req,res)=>{
    const {projectId}=req.params
    console.log(projectId);
    

    try{
        if(!projectId){
          return  res.status(400).json({message:"project id required"})
        }
        const messages= await messageModel.find({projectId})
        res.status(200).json(messages)


    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const postMessage=async(req,res)=>{
    const {projectId,text,sender}=req.body;
    try {
        if(!projectId || !text || !sender){
            return res.status(400).json({message:"all fileld are required"})
        }


        const newMessage= await messageModel.create({projectId,text,sender})
        res.status(201).json({message:"new message created"})

        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}