import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import index from '../index'

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
export default app