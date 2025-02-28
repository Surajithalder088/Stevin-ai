
import userModel from "../models/user.model.js"
import * as userService from "../services/user.service.js"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"

import redisClient from "../services/redis.service.js"

export const createUserController =async (req,res)=>{
   const {email,password}=req.body
    try{
        
        
        const user =await userService.createUser(email,password)

        const token=jwt.sign({email:user.email},process.env.JWT_SECRET,{
            expiresIn:'24h'
        })

        res.status(201).json({message:"success", user,token})
    }catch(error){
        res.status(500).send(error)

    }

}

export const loginController=async(req,res)=>{
    const {email,password} =req.body
    try{
        console.log("login start ");
        
        const user =await userService.loginUser(email,password)

        const token=jwt.sign({email:user.email},process.env.JWT_SECRET,{
            expiresIn:'24h'
        })
        //res.setHeader('Authorization',`Bearer ${token}`)
        res.cookie('stevin_token',token,{
            httpOnly:true,
            secure:false,
            maxAge:60*60*24*100,
        })
        
        res.status(200).json({user,token})
    }catch(error){
        res.status(400).send(error)
    }
    


}

export const profileController=async(req,res)=>{
    const user= req.user
    const loggenIduser=await userModel.findOne({email:user.email});
    res.status(200).json({user:loggenIduser})
}

export const logoutController=async(req,res)=>{
    try{
        const token =req.cookies.token || req.headers.authorization.split(' ')[1]
       
        
        await redisClient.set(token,'logout','EX',60*60*24)

        res.status(200).json({
            message:"logout successfully"
        })

    }catch(error){
        res.status(400).send(error)
    }
}

export const allUsersController=async(req,res)=>{
    try{
        const {projectid}=req.params
        if(!projectid){
            return res.status(404).json('Project id required')
        }
        
        
        
        const users=await userService.getallUsers({projectid})

        res.status(200).json({users})
    }catch(error){
        res.status(400).send(error)
    }
}

