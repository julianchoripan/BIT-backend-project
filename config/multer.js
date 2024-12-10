import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Crear __dirname en un entorno ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log("fffff--->", __dirname);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Suponiendo que la entidad viene como un parámetro en la solicitud

    let folder = "";

    // Define la carpeta según la entidad
    if (req.url === "/api/users" && req.method === "POST") {
      console.log(req.url, " ------", req.method);
      //cb(null, path.join(import.meta.dirname, "../avatar/imgUser"));
      folder = "../avatar/imgUser";
    } else if (req.url === "/api/products" && req.method === "POST") {
      //cb(null, path.join(import.meta.dirname, "../avatar/imgProducts"));
      folder = "../avatar/imgProducts";
    }

    cb(null, path.join("C:UsersUsuarioDesktopproyecto-backendconfig", folder));

    //cb(null, folder);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Archivo no valido"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
