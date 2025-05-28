import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mainRouter from "./router/index.js"
const app = express();







app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use("/api/v1",mainRouter)

app.listen(3000,()=>{
    console.log("Srever Running on port 3000")
})