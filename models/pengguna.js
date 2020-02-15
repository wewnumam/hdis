const mongoose = require('mongoose')

const penggunaSchema = new mongoose.Schema({
   username: String,
   password: String,
   role: String
})

module.exports = mongoose.model('Pengguna', penggunaSchema, 'pengguna')