import express from 'express';
import {getAllUser, createUser, loginUser, deleteUser, upadateUser} from '../controller/user-controller.js';
import { loggedInUserOnly } from '../middleware/auth.js';


const router = express.Router();



router.get("/",getAllUser);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.delete("/delete/:id", loggedInUserOnly,deleteUser);
router.put("/update/:id", loggedInUserOnly,upadateUser);

export default router;