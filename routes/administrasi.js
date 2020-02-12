const express = require('express')
const router = express.Router()
const Administrasi = require('../models/administrasi')
const Diagnosa = require('../models/diagnosa')
const Pasien = require('../models/pasien')
const Resep = require('../models/resep')
const Obat = require('../models/obat')

// get administrasi
async function getAdministrasi(req, res, next) {
    try {
        administrasi = await Administrasi.findById(req.params.id)
        if (administrasi == null) {
            return res.status(404).json({
                message: 'Cant find administrasi'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.administrasi = administrasi
    next()
}

// get all diagnosa
router.get('/', (req, res, next) => {
    Diagnosa.find((err, diagnosa) => {
        diagnosa = JSON.parse(JSON.stringify(diagnosa))
        Pasien.find((err, pasien) => {
            pasien = JSON.parse(JSON.stringify(pasien))
            Resep.find((err, resep) => {
                resep = JSON.parse(JSON.stringify(resep))
                Obat.find((err, obat) => {
                    obat = JSON.parse(JSON.stringify(obat))
                    Administrasi.find((err, administrasi) => {
                        administrasi = JSON.parse(JSON.stringify(administrasi))
                            if (err) throw res.json({
                                message: err.message
                            })
                            res.render('administrasi', {
                                title: 'Data Rekam Medis',
                                diagnosa: diagnosa,
                                pasien: pasien,
                                resep: resep,
                                obat: obat,
                                administrasi: administrasi
                            })
                    })
                })
            })
        })
    })

})

// get single diagnosa
router.get('/:id', (req, res, next) => {
    Diagnosa.find((err, diagnosa) => {
        diagnosa = JSON.parse(JSON.stringify(diagnosa))
        Pasien.find((err, pasien) => {
            pasien = JSON.parse(JSON.stringify(pasien))
            Resep.find((err, resep) => {
                resep = JSON.parse(JSON.stringify(resep))
                Obat.find((err, obat) => {
                    obat = JSON.parse(JSON.stringify(obat))
                    Administrasi.find((err, administrasi) => {
                        administrasi = JSON.parse(JSON.stringify(administrasi))
                        if (err) throw res.json({
                            message: err.message
                        })
                        res.render('detAdministrasi', {
                            title: 'Detail Rekam Medis',
                            diagnosa: diagnosa,
                            pasien: pasien,
                            resep: resep,
                            obat: obat,
                            administrasi: administrasi.filter(c => c._id == req.params.id)
                        })
                    })
                })
            })
        })
    })
})

// create diagnosa
router.post('/', async (req, res) => {
    const administrasi = new Administrasi({
        tglAdmin: req.body.tglAdmin,
        kodePasien: req.body.kodePasien,
        kodeResep: req.body.kodeResep,
        kodeObat: req.body.kodeObat,
        kodeDiagnosa: req.body.kodeDiagnosa,
        lamaInap: req.body.lamaInap,
        biaya: req.body.biaya
    })
    try {
        await administrasi.save()
        res.redirect('/administrasi')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update administrasi
router.patch('/:id', getAdministrasi, async (req, res) => {
    if (req.body.tglAdmin != null) {
        res.administrasi.tglAdmin = req.body.tglAdmin
    }
    if (req.body.kodePasien != null) {
        res.administrasi.kodePasien = req.body.kodePasien
    }
    if (req.body.kodeResep != null) {
        res.administrasi.kodeResep = req.body.kodeResep
    }
    if (req.body.kodeObat != null) {
        res.administrasi.kodeObat = req.body.kodeObat
    }
    if (req.body.kodeDiagnosa != null) {
        res.administrasi.kodeDiagnosa = req.body.kodeDiagnosa
    }
    if (req.body.lamaInap != null) {
        res.administrasi.lamaInap = req.body.lamaInap
    }
    if (req.body.biaya != null) {
        res.administrasi.biaya = req.body.biaya
    }

    try {
        await res.administrasi.save()
        res.redirect(`/administrasi/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete diagnosa
router.delete('/:id', getAdministrasi, async (req, res) => {
    try {
        await res.administrasi.remove()
        res.redirect('/administrasi')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router