const mongoose = require('mongoose')

const perawatSchema = new mongoose.Schema({
    nama: String,
    jk: String,
    alamat: String,
    noTelp: String,
    kodeRuang: Number,
    jamJaga: String
})

module.exports = mongoose.model('Perawat', perawatSchema, 'perawat')