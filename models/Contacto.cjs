const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true }
});

const Contacto = mongoose.model("Contacto", ContactoSchema);
module.exports = Contacto;

