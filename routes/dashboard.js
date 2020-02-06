const express = require('express')
const router  = express.Router()
const Pasien  = require('../models/pasien')
const Dokter  = require('../models/dokter')

router.get('/', (req, res, next) => {
    Dokter.find((err, dokter) => {
        Pasien.find((err, pasien) => res.render('dashboard', {
            title   : 'Dashboard',
            pasien  : pasien.length,
            dokter  : dokter.length,
            pasienLk: pasien.filter(a => a.jk == 'laki-laki').length,
            pasienPr: pasien.filter(a => a.jk == 'perempuan').length,
            pasienRj: pasien.filter(a => a.jenPeriksa == 'rawat jalan').length,
            pasienRi: pasien.filter(a => a.jenPeriksa == 'rawat inap').length
        }))
    })
})


// TM      : dokter.length + perawat.length,
// TMLk    : dokter.filter(a => a.jk == 'laki-laki').length + perawat.filter(a => a.jk == 'laki-laki').length,
// TMPr    : dokter.filter(a => a.jk == 'perempuan').length + perawat.filter(a => a.jk == 'perempuan').length

module.exports = router