import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import index from "./api/routes/index.js";
console.log(process.env.DATABASE_URL)
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", index);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
