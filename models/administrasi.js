const mongoose = require('mongoose')

const administrasiSchema = new mongoose.Schema({
    tglAdmin: String,
    kodePasien: mongoose.Schema.Types.ObjectId,
    kodeResep: mongoose.Schema.Types.ObjectId,
    kodeObat: mongoose.Schema.Types.ObjectId,
    kodeDiagnosa: mongoose.Schema.Types.ObjectId,
    lamaInap: String,
    biaya: Number
})

module.exports = mongoose.model('Administrasi', administrasiSchema, 'administrasi')