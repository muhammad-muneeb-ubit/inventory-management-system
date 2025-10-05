import User from "../models/user.js";
import { approvalEmailTemplate, rejectionEmailTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
        status: false,
      });
    }
    res.status(200).json({
      message: "Users fetched successfully",
      status: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong!",
      status: false,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    res.status(200).json({
      message: "User fetched successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong!",
      status: false,
    });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    if (user.status === "approved") {
      return res.status(400).json({
        message: "User is already approved",
        status: false,
      });
    }
    user.status = "approved";
    await user.save();

     await sendEmail({
      to: user.email,
      subject: "✅ Your Hydra Foods Account Has Been Approved",
      html: approvalEmailTemplate(user.name),
    });

    res.status(200).json({
      message: "User approved successfully, email sent",
      status: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong!",
      status: false,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({
      status: true,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "something went wrong!",
    });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    user.status = "rejected";
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "❌ Hydra Foods Account Request Rejected",
      html: rejectionEmailTemplate(user.name),
    });

    res.status(200).json({
      message: "User rejected successfully, email sent",
      status: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong!",
      status: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong!",
      status: false,
    });
  }
};

export const getPendingUsers = async (req, res) => {
  try {
    const pending = await User.find({ status: "pending" }).sort({
      createdAt: -1,
    });
    if (!pending || pending.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No pending users found" });
    }
    res.status(200).json({ status: true, users: pending });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const changeRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        user.role = user.role === "admin" ? "user" : "admin";
        await user.save();
        res.status(200).json({ status: true, message: "User role updated successfully", user });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}
