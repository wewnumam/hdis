const mongoose = require('mongoose')

const rmSchema = new mongoose.Schema({
    tglRM: String,
    hasil: String,
    kodePasien: mongoose.Schema.Types.ObjectId,
    kodeDokter: mongoose.Schema.Types.ObjectId,
    kodeObat: mongoose.Schema.Types.ObjectId,
    kodeDiagnosa: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('RekMed', rmSchema, 'rm')