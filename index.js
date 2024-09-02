const express = require('express');
const mongoose = require('mongoose');
bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
import Usuario from './models/Contact';
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

app.post('/api/iniciarSesion', async (req, res) => {
  const { nombre, contraseña } = req.body;
  try {
    const elUsuario = await Usuario.findOne({ nombre: nombre });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).send('Error al obtener contactos');
  }
  bcrypt.compare(contraseña, elUsuario.contraseña, function (err, result) {
    if (result == true) {
      res.status(201).send('sesion iniciada');
    } else {
      console.error('Error al iniciar sesion, la contraseña no coiside');
      res.status(500).send('Error al iniciar sesion');
    }
  });
});

app.post('/api/registrarse', async (req, res) => {
  const { nombre, contraseña } = req.body;

  bcrypt.hash(contraseña, 10, async (err, hash) => {

    const nuevoUsuario = new Usuario({
      nombre,
      hash
    });

    try {
      await nuevoUsuario.save();
      res.status(201).send('Contacto agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar contacto:', error);
      res.status(500).send('Error al agregar contacto');
    }
  });

  /*
  Ejemplo de JSON para prueba:
  {
    "nombre": "Juansito",
    "contraseña": "qwerty12345"
  }
  */
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
