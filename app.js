import express from 'express';
import {dbConnection} from './src/config/db.js';
import router from './src/routes/user-route.js';
import blogRouter from './src/routes/blog-route.js';
import cookieParser from 'cookie-parser';
import { loggedInUserOnly } from './src/middleware/auth.js';
import path from 'path';

const app = express();

dbConnection();

app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(cookieParser());
app.use("/user",router);

app.use("/blogs",loggedInUserOnly,blogRouter);












app.listen(5000,()=>{
    console.log("server is listening at port 5000");
});