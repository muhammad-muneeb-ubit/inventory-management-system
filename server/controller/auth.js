import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import { newUserSignupTemplate } from "../utils/emailTemplates.js";

export const signUp = async (req, res) => {
  try {
    const body = await req.body;
    if (!body.name || !body.email || !body.email.includes("@") || !body.password)
      return res.json({
        status: false,
        message: "All fields are required, and email must be valid and password should be of minimum 6 characters",
        user: null,
      });
    const { name, password, email } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        status: false,
        message: "User already exists with this email",
        user: null,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newbody = { ...body, password: hashPassword };
    const user = await User.create(newbody);

    await sendEmail({
      to: process.env.ADMIN_EMAIL, 
      subject: "🔔 New User Signup - Approval Needed",
      html: newUserSignupTemplate(user),
    });

    res.status(201).json({
      status: true,
      message: "Signup successful. Waiting for admin approval.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong!",
      status: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.json({
        message: "INVALID EMAIL OR PASSWORD",
        status: false,
      });
    }

    const comparePass = await bcrypt.compare(body.password, user.password);
    if (!comparePass) {
      return res.json({
        message: "INVALID EMAIL OR PASSWORD",
        status: false,
      });
    }

    const PRIVATE_KEY = process.env.JWTPRIVATE_KEY;
    const token = jwt.sign(
      { id: user._id, role: user.role, status: user.status },
      PRIVATE_KEY,{ expiresIn: "1d" }
    );
    res.json({
      message: "USER SUCCESSFULLY LOGIN",
      data: user,
      status: true,
      token,
    });
  } catch (error) {
    res.json({
      message: error.message || "INVALID EMAIL OR PASSWORD!",
      status: false,
    });
  }
};
