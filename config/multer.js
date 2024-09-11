import multer from "multer";
import path from "path";

const avatar = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(import.meta.dirname, "../avatar/ImgUser"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }});
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Archivo no valido"), false)
    }};
  
  const upload = multer({
    avatar: avatar,
    fileFilter: fileFilter,
  });
  
  export default upload;