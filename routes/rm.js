const express = require('express')
const router = express.Router()
const RekMed = require('../models/rm')
const Diagnosa = require('../models/diagnosa')
const Pasien = require('../models/pasien')
const Dokter = require('../models/dokter')
const Obat = require('../models/obat')

// get rm
async function getRM(req, res, next) {
    try {
        rm = await RekMed.findById(req.params.id)
        if (rm == null) {
            return res.status(404).json({
                message: 'Cant find rm'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.rm = rm
    next()
}

// get all rm
router.get('/', (req, res, next) => {
    Diagnosa.find((err, diagnosa) => {
        diagnosa = JSON.parse(JSON.stringify(diagnosa))
        Pasien.find((err, pasien) => {
            pasien = JSON.parse(JSON.stringify(pasien))
            Dokter.find((err, dokter) => {
                dokter = JSON.parse(JSON.stringify(dokter))
                Obat.find((err, obat) => {
                    obat = JSON.parse(JSON.stringify(obat))
                    RekMed.find((err, rm) => {
                        rm = JSON.parse(JSON.stringify(rm))
                            if (err) throw res.json({
                                message: err.message
                            })
                            res.render('rm', {
                                title: 'Data Rekam Medis',
                                diagnosa: diagnosa,
                                pasien: pasien,
                                dokter: dokter,
                                obat: obat,
                                rm: rm
                            })
                    })
                })
            })
        })
    })

})

// get single rm
router.get('/:id', (req, res, next) => {
    Diagnosa.find((err, diagnosa) => {
        diagnosa = JSON.parse(JSON.stringify(diagnosa))
        Pasien.find((err, pasien) => {
            pasien = JSON.parse(JSON.stringify(pasien))
            Dokter.find((err, dokter) => {
                dokter = JSON.parse(JSON.stringify(dokter))
                Obat.find((err, obat) => {
                    obat = JSON.parse(JSON.stringify(obat))
                    RekMed.find((err, rm) => {
                        rm = JSON.parse(JSON.stringify(rm))
                        if (err) throw res.json({
                            message: err.message
                        })
                        res.render('detRM', {
                            title: 'Detail Rekam Medis',
                            diagnosa: diagnosa,
                            pasien: pasien,
                            dokter: dokter,
                            obat: obat,
                            rm: rm.filter(c => c._id == req.params.id)
                        })
                    })
                })
            })
        })
    })
})

// create rm
router.post('/', async (req, res) => {
    const rm = new RekMed({
        tglRM: req.body.tglRM,
        kodePasien: req.body.kodePasien,
        kodeDokter: req.body.kodeDokter,
        kodeObat: req.body.kodeObat,
        kodeDiagnosa: req.body.kodeDiagnosa,
    })
    try {
        await rm.save()
        res.redirect('/rm')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update rm
router.patch('/:id', getRM, async (req, res) => {
    if (req.body.tglRM != null) {
        res.rm.tglRM = req.body.tglRM
    }
    if (req.body.kodePasien != null) {
        res.rm.kodePasien = req.body.kodePasien
    }
    if (req.body.kodeDokter != null) {
        res.rm.kodeDokter = req.body.kodeDokter
    }
    if (req.body.kodeObat != null) {
        res.rm.kodeObat = req.body.kodeObat
    }
    if (req.body.kodeDiagnosa != null) {
        res.rm.kodeDiagnosa = req.body.kodeDiagnosa
    }

    try {
        await res.rm.save()
        res.redirect(`/rm/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete rm
router.delete('/:id', getRM, async (req, res) => {
    try {
        await res.rm.remove()
        res.redirect('/rm')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router