import express from "express";

const app = express();
const port = 3000;

//servidor en escucha
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
