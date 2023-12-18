import express from 'express';
import dotenv from "dotenv"
import { dbConnect } from "./config/dbConnect.js"
import { initRoutes } from "./routes/index.js"

dotenv.config();
const app = express();
dbConnect();
app.use(express.json())
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
initRoutes(app);