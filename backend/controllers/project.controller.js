import projectModel from '../models/project.model.js';
import messageModel from "../models/message.model.js"
import * as projectService from '../services/project.service.js';
import userModel from '../models/user.model.js';


export const createProjectController = async (req, res) => {
    try {
        const { name} = req.body;
        if(!req.user){
           return res.status(400).json({ message: "unauthorized" });
        }
    const loggenIduser=await userModel.findOne({email:req.user.email});
    const userId=loggenIduser._id;
        const project = await projectService.createProject(name, userId);
        res.status(201).json({message:"project created",project});
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ message: error.message });
    }
}

export const getProjectsController = async (req, res) => {
  try{
    const loggenIduser=await userModel.findOne({email:req.user.email});
    const userId=loggenIduser._id;
    const projects = await projectService.getProjects(userId);
    res.status(200).json({projects});

  }catch(error){
    console.log(error);
    res.status(400).json({ message: error.message });
  }

}

export const addUserController = async (req, res) => {
    const {users,projectId}=req.body;
    if(!users ||!projectId){
        return res.status(400).json({message:"Users and project are required"});
    }
    try{
        const loggenIduser=await userModel.findOne({email:req.user.email});
        const authuserId=loggenIduser._id;
       
        const project =await projectService.addUserToProject(users,projectId,authuserId);
        res.status(200).json({message:"Users added",project});


    }catch(error){
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export const getProjectByIdController = async (req, res) => {
    const {projectid}=req.params;
    if(!projectid){
        return res.status(400).json({message:"Project Id is required"});
    }
    try{
        console.log(projectid);
        
        const project =await projectService.getProjectById(projectid);
        res.status(200).json({project});

    }catch(error){
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

export const deleteproject=async(req,res)=>{
    const {projectid}=req.params
    try {
        const project=await projectModel.findByIdAndDelete({_id:projectid})

    if(!project){
        return res.status(400).json({message:"falied to get project"})
    }
    const message=await messageModel.deleteMany({projectId:project._id})
        res.status(200).json({message:"deleted",message})

    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }

    
}