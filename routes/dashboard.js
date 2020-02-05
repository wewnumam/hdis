const express = require('express')
const router  = express.Router()
const Pasien  = require('../models/pasien')

router.get('/', (req, res, next) => {
    Pasien.find((err, content) => res.render('dashboard', {
        title: 'Dashboard',
        pasien: content.length
    }))
})


// pasienLk: pasien.filter(a => a.jk == 'laki-laki').length,
// pasienPr: pasien.filter(a => a.jk == 'perempuan').length,
// pasienRj: pasien.filter(a => a.jenPeriksa == 'rawat jalan').length,
// pasienRi: pasien.filter(a => a.jenPeriksa == 'rawat inap').length,
// dokter  : dokter.length,
// perawat : perawat.length,
// TM      : dokter.length + perawat.length,
// TMLk    : dokter.filter(a => a.jk == 'laki-laki').length + perawat.filter(a => a.jk == 'laki-laki').length,
// TMPr    : dokter.filter(a => a.jk == 'perempuan').length + perawat.filter(a => a.jk == 'perempuan').length

module.exports = router