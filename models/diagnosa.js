const mongoose = require('mongoose')

const diagnosaSchema = new mongoose.Schema({
    tglPeriksa: String,
    hasil: String,
    kodePasien: mongoose.Schema.Types.ObjectId,
    kodeDokter: mongoose.Schema.Types.ObjectId,
    kodeObat: mongoose.Schema.Types.ObjectId,
    kodeTindakan: mongoose.Schema.Types.ObjectId,
    kodeRuangan: mongoose.Schema.Types.ObjectId,
    status: String
})

module.exports = mongoose.model('Diagnosa', diagnosaSchema, 'diagnosa')