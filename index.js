const express = require("express");
const cors = require("cors")


const app = express();

const bodyParser = require("body-parser");
const mainRouter = require("./router/index")



app.use(bodyParser.json())
app.use(cors())
app.use("/api/v1",mainRouter)

app.listen(3000,()=>{
    console.log("Srever Running on port 3000")
})