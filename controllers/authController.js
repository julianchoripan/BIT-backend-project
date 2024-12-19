import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    if (user) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (matchPassword) {
        const token = jwt.sign(
          { prueba: "123", id: user.id },
          process.env.JWT_SECRET
        );
        return res.json({ token: token });
      }
    }
    return res.status(501).json("Las credenciales son incorrectas");
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default { login };
