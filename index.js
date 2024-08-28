const express = require('express');
const mongoose = require('mongoose');
bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String, required: true }
});
const Contacto = mongoose.model('Contacto', contactoSchema);

app.get('/api/contactos', async (req, res) => {
  try {
    const contactos = await Contacto.find();
    res.json(contactos);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).send('Error al obtener contactos');
  }
});

app.post('/api/contactos', async (req, res) => {
  const { nombre, apellido, telefono } = req.body;

  if (!nombre || !apellido || !telefono) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const nuevoContacto = new Contacto({
    nombre,
    apellido,
    telefono
  });

  try {
    await nuevoContacto.save();
    res.status(201).send('Contacto agregado exitosamente');
  } catch (error) {
    console.error('Error al agregar contacto:', error);
    res.status(500).send('Error al agregar contacto');
  }
  /*
  Ejemplo de JSON para prueba:
  {
    "nombre": "Juansito",
    "apellido": "Gomez",
    "telefono": "1234567890"
  }
  */
});

app.delete('/api/contactos/:telefono', async (req, res) => {
  try {
    const resultado = await Contacto.findOneAndDelete({ telefono: req.params.telefono });

    if (!resultado) {
      return res.status(404).send('Contacto no encontrado');
    }

    res.status(200).send('Contacto eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    res.status(500).send('Error al eliminar contacto');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
