import express from "express";
import { login, signup, logout } from "../controller/auth.controller.js";

const router = express.Router();

router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;

// ZP07DH9ABBl700L4
