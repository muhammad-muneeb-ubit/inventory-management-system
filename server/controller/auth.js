import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signUp =  async (req, res) => {
  try {
    const body = await req.body;
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
    res.status(201).json({
      status: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong!",
      status: false,
    });
  }
}


export const login = async(req, res) => {
    try {
        const body = req.body
        // console.log("body", body)
        const user = await User.findOne({ email: body.email })
        // console.log("user", user)
        if (!user) {
            return res.json({
                message: "INVALID EMAIL OR PASSWORD",
                status: false
            })
        }

        const comparePass = await bcrypt.compare(body.password, user.password)
        // console.log("comparePass", comparePass)
        if (!comparePass) {
            return res.json({
                message: "INVALID EMAIL OR PASSWORD",
                status: false
            })
        }

        // jwt sign
        const PRIVATE_KEY = process.env.JWTPRIVATE_KEY
        const token = jwt.sign({ id: user._id, role: user.role, status: user.status }, PRIVATE_KEY)
        console.log("token", token)
        res.json({
            message: "USER SUCCESSFULLY LOGIN",
            data: user,
            status: true,
            token
        })


    } catch (error) {
        res.json({
            message: error.message || "something went wrong!",
            status: false
        })

    }

}
