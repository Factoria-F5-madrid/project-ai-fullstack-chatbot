// Servidor de Marginalia.
// Sirve el frontend estático (public/) y expone el catálogo en /api/books.
//
// (Punto de partida del taller: aquí todavía NO hay chatbot. Lo construiremos
// paso a paso — mira el README y la carpeta checkpoints/.)

const express = require("express");
const path = require("path");
const books = require("./books");

const app = express();
const PORT = process.env.PORT || 3000;

// Sin caché: cualquier cambio en public/ se ve con una recarga normal.
app.use(express.static(path.join(__dirname, "public"), {
  etag: false,
  lastModified: false,
  setHeaders: (res) => res.set("Cache-Control", "no-store")
}));

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`📚 Marginalia escuchando en http://localhost:${PORT}`);
});
