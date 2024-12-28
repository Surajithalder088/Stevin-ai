import projectModel from '../models/project.model.js';
import mongoose from 'mongoose';

export const createProject = async (
    name,userId
    ) => {
        if(!name){
            throw new Error('Name is required');
        }
        if(!userId){
            throw new Error('User is required');
        }
        const project = await projectModel.create({
            name,
            users:[userId]
        });
        
        return project;
    
}

export const getProjects = async (userId) => {
    if(!userId){
        throw new Error('User is required');
    }
    const projects = await projectModel.find({users:userId});
    return projects;
}

export const addUserToProject = async (users,projectId,authuserId) => {
    if(!users ||!projectId  ||!authuserId){
        throw new Error('Users and project are required');
    }

    
    const project =await projectModel.findOne({_id:projectId,users:authuserId}); 
    // auth user is part of project

    if(!project){
        throw new Error('auth user not in project');  // auth user is not part of this project
    }
  const updatedProject= await projectModel.findByIdAndUpdate({
    _id:projectId },
    {$addToSet:{users:{$each:users}}  // setting each user to project
        
  },{new:true})
  return updatedProject;
  

}

export  const getProjectById = async (projectId) => {
    if(!projectId){
        throw new Error('Project Id is required');
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid project id');
    }
    const project = await projectModel.findOne({_id:projectId}).populate('users')
    return project;
}
