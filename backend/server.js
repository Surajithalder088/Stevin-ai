import config from "./config.js"
import http from 'http'
import app from "./app.js"
import  {Server} from "socket.io"
import jwt from 'jsonwebtoken'
import projectModel from "./models/project.model.js"
import { generateResult} from "./services/ai.service.js"


const server=http.createServer(app);

/* sokect io set up */
const io= new Server(server,{
    cors:{
        origin:"*"
    }
});

 io.use(async(socket,next)=>{
    try {
        const token= socket.handshake.auth?.token ||  socket.handshake.headers.Authorization?.split(' ')[1];
        const projectId=socket.handshake.query.projectId.toString();

        socket.project=await projectModel.findById(projectId)
        
        if(!token){
            return next(new Error('Authentication error'))
        }
        const user=jwt.verify(token,process.env.JWT_SECRET);
        socket.user=user;
        next();
        
    } catch (error) {
        console.log(error);
        
        next(error)
        
    }
})



io.on('connection',(socket)=>{
    socket.roomId=socket.project._id.toString();
    console.log('user connected');

    socket.join(socket.roomId);

    socket.on('project-message',async data=>{

        const message=data.message;
        const aiIsPresentInMessage=message.includes('@ai')
        if(aiIsPresentInMessage){
            const prompt = message.replace('@ai','');
           const result= await generateResult(prompt);
           socket.broadcast.to(socket.roomId).emit('project-message',data)
           
           io.to(socket.roomId).emit('project-message',{
                message:result,
                sender:"AI"
           })
           console.log(socket.roomId);
           
            return
        }

        console.log(data);
        
        socket.broadcast.to(socket.roomId).emit('project-message',data)
    })

    socket.on('event',()=>{
        console.log('event')

    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
        socket.leave(socket.roomId);
    })
    })    



server.listen(process.env.PORT || 4000 ,()=>{
    console.log(" server is runnig on port "+ process.env.PORT);
    
})