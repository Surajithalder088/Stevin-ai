import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
    systemInstruction:`You are an expert in the developement as well as in logic ,
     you have 12 years of experience in the software developement,You create files as neede ans strusture them ,
      you never miss any edgeacase , you always write error free code .
      you always write modulize code for smplcity and maintainability.
     Tou always handle the errors and expectation. You create files .`
 });



export const generateResult=async(prompt)=>{
   
const result = await model.generateContent(prompt);

return result.response.text();
}


