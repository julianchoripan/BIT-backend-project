import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Suponiendo que la entidad viene como un parámetro en la solicitud
    const entity = req.params.entity; // "usuarios" o "productos"
    console.log (entity)
    let folder = "";

    // Define la carpeta según la entidad
    if (req.url === "/api/user" && req.method === 'POST') {
      folder = "./uploads/user";
    } else if (req.url === '/api/products' && req.method === 'POST') {
      folder = "./uploads/products";
    }
   
    cb(null, folder);
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
    storage: storage,
    fileFilter: fileFilter,
  });
  
  export default upload;