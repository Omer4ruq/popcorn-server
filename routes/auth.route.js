import express from "express";
import { login, signup, logout } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

// ZP07DH9ABBl700L4
