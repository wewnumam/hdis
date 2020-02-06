const mongoose = require('mongoose')

const dokterSchema = new mongoose.Schema({
    nama: String,
    jk: String,
    alamat: String,
    noTelp: String,
    spesialis: String,
    jamPraktek: String,
    noPraktek: Number
})

module.exports = mongoose.model('Dokter', dokterSchema, 'dokter')