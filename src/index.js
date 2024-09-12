import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"  //we need to define the path for the creditential for env . to use this feature we need to make changes in package.json(refer there in scripts sectone)
});

connectDB()