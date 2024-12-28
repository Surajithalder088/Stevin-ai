import mongoose from "mongoose"


const connectDB =async()=>{

    
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to data base");
        
    }).catch(err=>{
        console.log(err);
        
    })
 }

 export default connectDB ;