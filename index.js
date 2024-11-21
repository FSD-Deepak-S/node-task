import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import recipesRouter from "./Routers/recipes.router.js";
import connectDb from "./Database/dbConfig.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDb();

const port = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Receipes")
})

app.use('/api/recipes/',recipesRouter)

app.listen(port,()=>{
    console.log("Server Connected Successfully");
    
})