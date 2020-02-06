const mongoose = require('mongoose')

const obatSchema = new mongoose.Schema({
    nama: String,
    kategori: String,
    golongan: String,
    tglExp: String,
    harga: Number,
    jumlah: Number
})

module.exports = mongoose.model('Obat', obatSchema, 'obat')