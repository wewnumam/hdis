const mongoose = require('mongoose')

const ruanganSchema = new mongoose.Schema({
    nama: String,
    kelas: String,
    noKamar: Number,
    kondisi: String,
    tarif: Number
})

module.exports = mongoose.model('Ruangan', ruanganSchema, 'ruangan')