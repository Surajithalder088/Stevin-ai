
import express  from "express"
import connectDB from "./db/db.js"
import morgan from "morgan"
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import airoutes from './routes/ai.routes.js'
import cookieParser from "cookie-parser"
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url"

connectDB()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app=express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:"GET,POST,PUT,DELETE"
}))

const frontendPath=path.resolve(__dirname,'../frontend/dist')


app.use(express.static(frontendPath))



app.use('/api/users',userRoutes)
app.use('/api/projects',projectRoutes)
app.use('/api/ai',airoutes)

app.get("/",(req,res)=>{
    res.sendFile(path.join(frontendPath,'index.html'))
})

export default app;