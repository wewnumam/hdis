const express = require('express')
const router = express.Router()
const Pasien = require('../models/pasien')
const Dokter = require('../models/dokter')
const Perawat = require('../models/perawat')
const Obat = require('../models/obat')
const Ruangan = require('../models/ruangan')

router.get('/', (req, res, next) => {
    Dokter.find((err, dokter) => {
        Pasien.find((err, pasien) => {
            Perawat.find((err, perawat) => {
                Obat.find((err, obat) => {
                    Ruangan.find((err, ruangan) => res.render('dashboard', {
                        title   : 'Dashboard',
                        pasien  : pasien.length,
                        dokter  : dokter.length,
                        perawat : perawat.length,
                        obat : obat.length,
                        ruangan: ruangan.length,
                        pasienLk: pasien.filter(a => a.jk == 'laki-laki').length,
                        pasienPr: pasien.filter(a => a.jk == 'perempuan').length,
                        pasienRj: pasien.filter(a => a.jenPeriksa == 'rawat jalan').length,
                        pasienRi: pasien.filter(a => a.jenPeriksa == 'rawat inap').length,
                        TM      : dokter.length + perawat.length,
                        TMLk    : dokter.filter(a => a.jk == 'laki-laki').length + perawat.filter(a => a.jk == 'laki-laki').length,
                        TMPr    : dokter.filter(a => a.jk == 'perempuan').length + perawat.filter(a => a.jk == 'perempuan').length,
                        ruangTerisi: ruangan.filter(a => a.kondisi == 'terisi').length,
                        ruangKosong: ruangan.filter(a => a.kondisi == 'kosong').length
                    }))
                })
            })
        })
    })
})

module.exports = router