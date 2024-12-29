import * as ai from '../services/ai.service.js';

export const getResult=async(req,res)=>{
    try{
         const prompt=req.body.prompt;
    const result=await ai.generateResult(prompt);
    res.status(200).send(result);

    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
   
}
