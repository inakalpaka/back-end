const express = require('express');
const mongoose = require('mongoose');
bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
import Usuario from './models/Usuario.js';
import Contacto from './models/Contacto.js';
const uri = process.env.MONGODB_URI;
//comit
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
    console.error('Error al iniciar sesion', error);
    res.status(500).send('Error al iniciar sesion');
  }
  bcrypt.compare(contraseña, elUsuario.contraseña, function (err, result) {
    if (result == true) {
      res.status(301).redirect('/dashboard');
    } else {
      res.status(301).redirect('/api/iniciarSesion');
    }
  });
});
app.get('/dashboard', (req, res) => {
  res.send('Bienvenido al dashboard');
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
      res.status(201).send('registro exitoso');
    } catch (error) {
      console.error('Error al registrarse', error);
      res.status(500).send('Error al registrarse');
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

app.post('api/nuevo/contacto', async (req, res) => {
  const { nombreContacto, telefono } = req.body;

  const nuevoContacto = new Contacto({
    nombreContacto,
    telefono
  });

  try {
    await nuevoContacto.save();
    res.status(201).send('Contacto agregado exitosamente');
  } catch (error) {
    console.error('Error al agregar contacto:', error);
    res.status(500).send('Error al agregar contacto');
  }
});

app.get('/api/contactos', async (req, res) => {
  try {
    const contactos = await Contacto.find(); 
    res.status(200).json(contactos);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).send('Error al obtener contactos');
  }
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
