const express = require("express");
const app = express();


app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

const funcs = require("fs");

const animeFilePath = "./animes.json";

function leerDatos() {
  const data = funcs.readFileSync(animeFilePath, "utf8");
  return JSON.parse(data);
}

function guardarDatosAnime(datos) {
  const data = JSON.stringify(datos, null, 2);
  funcs.writeFileSync(animeFilePath, data);
}

app.get("/", (req, res) => {
  res.send("¡Bienvenidos a nuestros tests!");
});

app.get("/animes", (req, res) => {
  const datosAnimes = leerDatos();
  res.json(datosAnimes);
});

app.get("/animes/:id", (req, res) => {
  const id = req.params.id;
  const datosAnime = leerDatos();
  const animes = datosAnime[id];
  res.json(animes);
});

app.get("/animes/nombre/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const datosAnime = leerDatos();
  const anime = Object.values(datosAnime).find(
    (anime) => anime.nombre.toLowerCase() === nombre.toLowerCase()
  );
  res.json(anime);
});

app.post("/animes", (req, res) => {
  const nuevoAnime = req.body;
  const datosAnime = leerDatos();
  const nuevoId = Object.keys(datosAnime).length + 1;
  datosAnime[nuevoId] = nuevoAnime;
  guardarDatosAnime(datosAnime);
  res.json({ mensaje: "Anime creado exitosamente" });
});

app.put("/animes/:id", (req, res) => {
  const id = req.params.id;
  const datosAnime = leerDatos();
  if (datosAnime.hasOwnProperty(id)) {
    const animeActualizado = req.body;
    datosAnime[id] = animeActualizado;
    guardarDatosAnime(datosAnime);
    res.json({ mensaje: "Anime actualizado exitosamente" });
  } else {
    res.status(404).json({ mensaje: "Anime no encontrado" });
  }
});

app.delete("/animes/:id", (req, res) => {
  const id = req.params.id;
  const datosAnime = leerDatos();
  if (datosAnime.hasOwnProperty(id)) {
    delete datosAnime[id];
    guardarDatosAnime(datosAnime);
    res.json({ mensaje: "Anime eliminado exitosamente" });
  } else {
    res.status(404).json({ mensaje: "Anime no encontrado" });
  }
});

module.exports = app;
