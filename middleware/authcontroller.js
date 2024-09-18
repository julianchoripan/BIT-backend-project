import bcrypt from "bcrypt";
import User from "../models/User.js";

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    //comparar la contraseña
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      return res.json("Te damos la bienvenida");
    }
  }

  return res.json("Las credenciales son incorrectas");
}

export default { login };
