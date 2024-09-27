import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

//obtener todos los usuarios
async function getAllUsers(req, res) {
  try {
    const users = await User.find({ deletedAt: { $eq: null } }).select(
      "-password"
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//obtener un usuario
async function getUserById(req, res) {
  try {
    const userId = req.params.id;
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
    return res.status(500).json({ message: "Internal server error" });
  }
}

//crear un usuario
async function createUser(req, res) {
  //console.log(req.file)
  const result = validationResult(req);
  if (result.isEmpty()) {
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
        email,
        password,
        age,
        address,
        phoneNumber,
        image: req.file.filename,
      });
      return res.status(201).json(newUser);
    } else {
      res.json({ message: "El usuario ya existe" });
    }
  } else {
    return res.json({ error: result.array() });
  }
}

//actualizar los datos de un usuario
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updates = req.body;
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
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
    return res.status(500).json({ message: "Internal server error" });
  }
}
// async function login(req, res) {
//   const user = await User.findOne({ email: req.body.email });

//   if (user) {
//     //comparar la contraseña
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (match) {
//       return res.json("Te damos la bienvenida");
//     }
//   }

//   return res.json("Las credenciales son incorrectas");
// }

export default {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  //login: login,
};
