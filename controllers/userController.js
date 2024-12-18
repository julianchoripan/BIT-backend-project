import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

//obtener todos los usuarios
async function getAllUsers(req, res) {
  try {
    const users = await User.find({ deletedAt: { $eq: null } }).select(
      "-password"
    );

    // if (users.length === 0) {
    //   return res.status(401).json({ ok: false, msg: "User not found" });
    // }
    return res.status(200).json({ ok: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
}

//obtener un usuario
async function getUserById(req, res) {
  try {
    const userId = req.auth.id;
    const userFound = await User.findOne({
      _id: userId,
      deletedAt: { $eq: null },
    }).select("-password");
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
}

//crear un usuario
async function createUser(req, res) {
  try {
    //console.log(req.file)
    //const result = validationResult(req);
    // if (result.isEmpty()) {
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      age,
      address,
      phoneNumber,
    } = req.body;
    //const imgUser = req.file.filename;
    const userCreated = await User.findOne({ email: email });
    if (!userCreated) {
      const newUser = await User.create({
        username,
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        age,
        address,
        phoneNumber,
        image: req?.file?.filename,
      });
      return res.status(201).json(newUser);
    } else {
      res.json({ message: "El usuario ya existe" });
    }
    // } else {
    //   return res.json({ error: result.array() });
    // }
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
}

//actualizar los datos de un usuario
async function updateUser(req, res) {
  console.log("req body-->", req.body);
  try {
    const userId = req.auth.id;
    const updates = req.body;
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
}

//borrar un usuario
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.deletedAt) {
      return res.status(400).json({ message: "User already deleted" });
    }
    user.deletedAt = new Date();
    await user.save();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Server error" });
  }
}

export default {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
