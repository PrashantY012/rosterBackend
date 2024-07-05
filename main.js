import express from "express"
import managerRouter from "./Routes/managerRoutes.js"
import staffRouter from "./Routes/staffRoutes.js"
import {config} from "dotenv"
import { databaseDB } from "./Database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();



config({
  path:"./Database/config.env"
})
// console.log(process.env.FRONTEND_URL)
app.use(cors({
  origin:process.env.FRONTEND_URL,
  method:["GET","POST","PUT","DELETE"],
  credentials:true
}))

app.use(express.json({limit: '50mb'}))
app.use(cookieParser())
app.use("/manager",managerRouter)
app.use("/staff",staffRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


//connecting database
databaseDB();

app.listen(process.env.PORT, () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`);
});