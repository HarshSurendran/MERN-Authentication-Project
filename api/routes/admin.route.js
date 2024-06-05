import express from 'express';
import { adminLogin, adminSignUp, users, deleteUser, getUser, editUser, adminSignout } from '../controllers/admin.controller.js';
import { verifyAdminToken } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post("/signin", adminLogin);
router.post("/signup", adminSignUp);
router.get("/users", verifyAdminToken, users);
router.delete("/delete/:id", verifyAdminToken, deleteUser);
router.get("/getuser/:id", verifyAdminToken, getUser);
router.post("/edituser", verifyAdminToken, editUser);
router.get("/signout", verifyAdminToken, adminSignout);


export default router;