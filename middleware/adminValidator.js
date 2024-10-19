import User from "../models/User.js";

async function adminAccess(req, res, next) {
  try {
    const adminIdentify = await User.findById(req.auth.id);

    if (adminIdentify.roleCode === 900) {
      next();
    } else {
      //console.log("Code-->", adminIdentify.roleCode);
      //console.log("Object-->", adminIdentify);
      return res.status(401).json("No eres Administrador");
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
}

export default adminAccess;
