import connectDB from "../config/database.js";
import Product from "../models/Product.js";

async function productSeeder() {
  connectDB();

  await Product.create({
    name: "Freno de disco delantero AKT EVO R3 GX",
    description:
      "Fabricados con tecnologia de vanguardia y utilizando materias primas de alta calidad. se utilizan aleaciones de acero inoxidable para garantizar un frenado seguro.",
    price: "40000",
    brand: "AKT",
    model: "EVO 3R GX",
    category: "Frenos",
    dimensions: "30x30cm",
    stock: "50",
  });

  await Product.create({
    name: "Bujia Everestt CR9DF Pulsar 180",
    description:
      "Las bujias everestt son fabricadas con altos estandares de calidad, para proporcionar seguridad al encender el motor y akto rendimiento en la via.",
    price: "6000",
    brand: "Pulsar",
    model: "180cc",
    category: "motor",
    dimensions: "5x10cm",
    stock: "100",
  });

  await Product.create({
    name: "kit de arrastre para GN 125 428H/42T/132L Yahosuka",
    description:
      "Cada elemento de nuestro kit de arrastre ha sido diseñado para ofrecer una durabilidad exepcional y garantizar una vida util prolongada.",
    price: "47000",
    brand: "suzuki",
    model: "GN 125 Euro",
    category: "cadenas",
    dimensions: "80x50cm",
    stock: "20",
  });

  console.log("[seeder] se han creado productos de prueba");
  process.exit(1);
}
productSeeder();