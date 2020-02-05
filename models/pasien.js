const mongoose = require('mongoose')

const pasienSchema = new mongoose.Schema({
    nama: String,
    jk: String,
    usia: Number,
    nik: String,
    alamat: String,
    noTelp: String,
    tglDaftar: String,
    jenPeriksa: String
})

module.exports = mongoose.model('Pasien', pasienSchema, 'pasien')