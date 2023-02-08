import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import index from '../index'
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

//Serving an HTML template at a root URL
app.get('/', (req,res)=>{
    res.status(200).send(index())
})

// mount routes
// Adding user CRUD APIs
app.use('/', userRoutes)
app.use('/', authRoutes)


app.use ((error, req, res, next) => {
    if (error.name === 'UnauthorizedError'){
        res.status(401).json({"error":error.name + ":" + error.message})
    } else if (error){
        res.status(400).json({"error":error.name + ":" + error.message})
        console.log(error)
    }
    next()
})

export default app