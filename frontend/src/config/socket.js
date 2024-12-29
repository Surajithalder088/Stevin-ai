
import socket from  "socket.io-client";

let socketInstance =null;

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.pop().split(';').shift();
};
export const initializeSocket = async(projectId) => {
    const token=getCookie("token");
    try{
         socketInstance = socket(import.meta.env.VITE_API_URL,{
            auth:{
                token:localStorage.getItem("token")
            },
        query:{
            projectId
        }
    });
      console.log("connect to socket backend");
    }catch(err){
        console.log(err);
        
    }
   
    
  
    return socketInstance;
    
}

export const recievemessage=(eventName,cb)=>{
    socketInstance.on(eventName,cb);
}

export const sendmessage=(eventName,data)=>{
    socketInstance.emit(eventName,data);
}