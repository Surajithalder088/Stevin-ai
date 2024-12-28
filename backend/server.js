import   config from "./config.js"


import http from 'http'
import app from "./app.js"




const server=http.createServer(app);



server.listen(process.env.PORT || 4000 ,()=>{
    console.log(" server is runnig on port "+ process.env.PORT);
    
})