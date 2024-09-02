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

app.post('/api/login', async (req, res) => {
  const { nombre, contraseña } = req.body;

  //comprobar si existe el usuario
  //comparar la contraseña con la contraseña hasheada


  try {
    res.status(201).send('Sesion iniciada');
  } catch (error) {
    console.error('Error iniciando sesion', error);
    res.status(500).send('Error iniciar sesion');
  }
  /*
  Ejemplo de JSON para prueba:
  {
    "nombre": "Juansito",
    "contraseña": "qwerty12345"
  }
  */
});
app.get('/api/contactos', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).send('Error al obtener contactos');
  }
  const { nombre, contraseña } = req.body;

  bcrypt.compare(contraseña, hash, function(err, result) {
    // result == true
});
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
