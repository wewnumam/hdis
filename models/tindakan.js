const mongoose = require('mongoose')

const tindakanSchema = new mongoose.Schema({
    nama: String,
    biaya: Number
})

module.exports = mongoose.model('Tindakan', tindakanSchema, 'tindakan')