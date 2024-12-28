import userModel from "../models/user.model.js"
import projectModel from "../models/project.model.js"
import bcrypt from "bcrypt"

export const createUser=async (
    email,password
)=>{
    if(!email ||!password){
        throw new Error('Email and password required')
    }
    
    
    const existinguser=await userModel.findOne({email:email})
    if(existinguser){
        throw new Error('User exist')
    }
    
    const hashedPassword= await userModel.hashPassword(password)
    const user =await userModel.create({
        email,
        password:hashedPassword
    })
    return user;

}

export const loginUser=async(email,password)=>{
    if(!email ||!password){
        throw new Error('Email and password required')
    }
    
    
    const user=await userModel.findOne({email:email}).select('+password')
    if(!user){
        throw new Error('User does not exist')
    }
    console.log(user);
    
    
    const isvalid= await bcrypt.compare(password,user.password)
    console.log(isvalid);
    
    
    

    if(!isvalid){
        throw new Error('Email and password required')
    }
    return user

}

export const getallUsers=async({projectid})=>{
  
     const project=await projectModel.findOne({_id:projectid})
     const ExcludingUsers=project.users;
    const users=await userModel.find({
        _id:{
           $nin:ExcludingUsers
        }
    })
    return users
}