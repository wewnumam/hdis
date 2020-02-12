const express = require('express')
const router = express.Router()
const Resep = require('../models/resep')
const Pasien = require('../models/pasien')
const Dokter = require('../models/dokter')
const Obat = require('../models/obat')

// get resep
async function getResep(req, res, next) {
    try {
        resep = await Resep.findById(req.params.id)
        if (resep == null) {
            return res.status(404).json({
                message: 'Cant find resep'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.resep = resep
    next()
}

// get all resep
router.get('/', (req, res, next) => {
    Resep.find((err, resep) => {
        resep = JSON.parse(JSON.stringify(resep))
        Pasien.find((err, pasien) => {
            pasien = JSON.parse(JSON.stringify(pasien))
            Dokter.find((err, dokter) => {
                dokter = JSON.parse(JSON.stringify(dokter))
                Obat.find((err, obat) => {
                    obat = JSON.parse(JSON.stringify(obat))
                    if (err) throw res.json({
                        message: err.message
                    })
                    res.render('resep', {
                        title: 'Data Resep',
                        resep: resep,
                        pasien: pasien,
                        dokter: dokter,
                        obat: obat
                    })
                })
            })
        })
    })

})

// get single resep
router.get('/:id', (req, res, next) => {
    Resep.find((err, resep) => {
        resep = JSON.parse(JSON.stringify(resep))
        Pasien.find((err, pasien) => {
            pasien = JSON.parse(JSON.stringify(pasien))
            Dokter.find((err, dokter) => {
                dokter = JSON.parse(JSON.stringify(dokter))
                Obat.find((err, obat) => {
                    obat = JSON.parse(JSON.stringify(obat))
                    if (err) throw res.json({
                        message: err.message
                    })
                    res.render('detResep', {
                        title: 'Detail Resep',
                        resep: resep.filter(c => c._id == req.params.id),
                        pasien: pasien,
                        dokter: dokter,
                        obat: obat
                    })
                })
            })
        })
    })
})

// create resep
router.post('/', async (req, res) => {
    const resep = new Resep({
        tglResep: req.body.tglResep,
        kodePasien: req.body.kodePasien,
        kodeDokter: req.body.kodeDokter,
        kodeObat: req.body.kodeObat,
        pakai: req.body.pakai,
        harga: req.body.harga
    })
    try {
        await resep.save()
        res.redirect('/resep')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update resep
router.patch('/:id', getResep, async (req, res) => {
    if (req.body.tglResep != null) {
        res.resep.tglResep = req.body.tglResep
    }
    if (req.body.kodePasien != null) {
        res.resep.kodePasien = req.body.kodePasien
    }
    if (req.body.kodeDokter != null) {
        res.resep.kodeDokter = req.body.kodeDokter
    }
    if (req.body.kodeObat != null) {
        res.resep.kodeObat = req.body.kodeObat
    }
    if (req.body.pakai != null) {
        res.resep.pakai = req.body.pakai
    }
    if (req.body.harga != null) {
        res.resep.harga = req.body.harga
    }

    try {
        await res.resep.save()
        res.redirect(`/resep/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete resep
router.delete('/:id', getResep, async (req, res) => {
    try {
        await res.resep.remove()
        res.redirect('/resep')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router