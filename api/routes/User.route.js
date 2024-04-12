import express from "express";
const router = express.Router();
import { signin, signup, google, updateUser, deleteUser, signout } from "../controller/User.controller.js";
import { veriftToken } from "../utils/verifyUser.js";



router.post('/SignUp', signup)
router.post('/SignIn', signin)
router.post('/google', google)
router.post('/update/:id', veriftToken, updateUser)
router.delete('/delete/:id', veriftToken, deleteUser)
router.get('/SignOut', signout)


export default router;