import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createDefaultAdmin = async () => {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: "System Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        role: "admin",
        status: "approved",
      });
      console.log("Default admin created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating default admin:", error.message);
  }
};
