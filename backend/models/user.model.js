import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:[6,'Email must be in six characterS']
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

userSchema.statics.hashPassword=async (password)=>{
    return  await bcrypt.hash(password,10)

}

userSchema.method.isValidPassword=async (password)=>{
    return await bcrypt.compare(password,this.password)
}

userSchema.method.generateJwt=async function(){
    return jwt.sign({email:this.email},process.env.JWT_SECRET)
}

const User =mongoose.model('User',userSchema);
export default User;