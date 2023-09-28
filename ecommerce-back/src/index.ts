import express, { Request, Response } from "express";
import { routes } from "./routes";
import { connectToDatabase } from "./utils/db-utils";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser"
import { seedDatabase } from "./seed/seed";
require("dotenv").config()
const app=express()
app.use(bodyParser())
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))
app.get('/',(req:Request,res:Response)=>{
     res.send('Ecommerce Application')
})
connectToDatabase("mongodb://localhost:27017","EcommerceIberis")
.then(res=>{
    seedDatabase()

    console.log("Connected To Database Successfully")
})
.catch(error=>{
    console.log(`Error While Connecting to database ${error}`)
    return;
})

const port=process.env.PORT
routes(app)
app.listen(port,()=>{
    console.log(`Server is listening to the port ${port}`);
    
})