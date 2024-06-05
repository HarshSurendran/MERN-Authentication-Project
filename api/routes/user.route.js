import express from 'express';
import { deleteUser, updateUser, checkUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get("/checkuser", verifyToken, checkUser);

export default router;
