import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const existingUserByName = await User.findOne({ username: username });

    if (existingUserByName) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar1.png", "/avatar1.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
      image: image,
    });

    generateTokenSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ success: false, message: "invalid server error" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "All fields are required" });
    }

    const user = await User.findone({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, mesage: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.jscompare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, mesage: "Invalid credentials" });
    }
    generateTokenSetCookie(newUser._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in loging controler");
    res.status(500).json({ success: false, message: "internal server error" });
  }
}
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-popcorn");
    res.status(200).json({ success: true, message: "Logged out succesfully " });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}
