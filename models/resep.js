const mongoose = require('mongoose')

const resepSchema = new mongoose.Schema({
    tglResep: String,
    hasil: String,
    kodePasien: mongoose.Schema.Types.ObjectId,
    kodeDokter: mongoose.Schema.Types.ObjectId,
    kodeObat: mongoose.Schema.Types.ObjectId,
    pakai: String,
    harga: Number
})

module.exports = mongoose.model('Resep', resepSchema, 'resep')