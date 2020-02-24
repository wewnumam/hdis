const express = require('express')
const router = express.Router()
const Diagnosa = require('../models/diagnosa')
const Pasien = require('../models/pasien')
const Dokter = require('../models/dokter')
const Obat = require('../models/obat')
const Tindakan = require('../models/tindakan')
const Ruangan = require('../models/ruangan')

// get diagnosa
async function getDiagnosa(req, res, next) {
    try {
        diagnosa = await Diagnosa.findById(req.params.id)
        if (diagnosa == null) {
            return res.status(404).json({
                message: 'Cant find diagnosa'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.diagnosa = diagnosa
    next()
}

// get all diagnosa
router.get('/', (req, res, next) => {
    if (req.session.user) {
        if (req.session.role == 'perawat') {
            return res.redirect('/')
        }
        Diagnosa.find((err, diagnosa) => {
            diagnosa = JSON.parse(JSON.stringify(diagnosa))
            Pasien.find((err, pasien) => {
                pasien = JSON.parse(JSON.stringify(pasien))
                Dokter.find((err, dokter) => {
                    dokter = JSON.parse(JSON.stringify(dokter))
                    Obat.find((err, obat) => {
                        obat = JSON.parse(JSON.stringify(obat))
                        Tindakan.find((err, tindakan) => {
                            tindakan = JSON.parse(JSON.stringify(tindakan))
                            Ruangan.find((err, ruangan) => {
                                ruangan = JSON.parse(JSON.stringify(ruangan))
                                if (err) throw res.json({
                                    message: err.message
                                })
                                res.render('diagnosa', {
                                    title: 'Data Diagnosa',
                                    user: req.session.user,
                                    diagnosa: diagnosa,
                                    pasien: pasien,
                                    dokter: dokter,
                                    obat: obat,
                                    tindakan: tindakan,
                                    ruangan: ruangan
                                })
                            })
                        })
                    })
                })
            })
        })
    } else {
        return res.redirect('/auth/login')
    }
})

// get single diagnosa
router.get('/:id', (req, res, next) => {
    if (req.session.user) {
        if (req.session.role == 'perawat') {
            return res.redirect('/')
        }
        Diagnosa.find((err, diagnosa) => {
            diagnosa = JSON.parse(JSON.stringify(diagnosa))
            Pasien.find((err, pasien) => {
                pasien = JSON.parse(JSON.stringify(pasien))
                Dokter.find((err, dokter) => {
                    dokter = JSON.parse(JSON.stringify(dokter))
                    Obat.find((err, obat) => {
                        obat = JSON.parse(JSON.stringify(obat))
                        Tindakan.find((err, tindakan) => {
                            tindakan = JSON.parse(JSON.stringify(tindakan))
                            Ruangan.find((err, ruangan) => {
                                ruangan = JSON.parse(JSON.stringify(ruangan))
                                if (err) throw res.json({
                                    message: err.message
                                })
                                res.render('detDiagnosa', {
                                    title: 'Detail Diagnosa',
                                    user: req.session.user,
                                    diagnosa: diagnosa.filter(c => c._id == req.params.id),
                                    pasien: pasien,
                                    dokter: dokter,
                                    obat: obat,
                                    tindakan: tindakan,
                                    ruangan: ruangan
                                })
                            })
                        })
                    })
                })
            })
        })
    } else {
        return res.redirect('/auth/login')
    }
})

// create diagnosa
router.post('/', async (req, res) => {
    const diagnosa = new Diagnosa({
        tglPeriksa: req.body.tglPeriksa,
        hasil: req.body.hasil,
        kodePasien: req.body.kodePasien,
        kodeDokter: req.body.kodeDokter,
        kodeObat: req.body.kodeObat,
        kodeTindakan: req.body.kodeTindakan,
        kodeRuangan: req.body.kodeRuangan,
        status: req.body.status
    })
    try {
        await diagnosa.save()
        res.redirect('/diagnosa')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update diagnosa
router.patch('/:id', getDiagnosa, async (req, res) => {
    if (req.body.tglPeriksa != null) {
        res.diagnosa.tglPeriksa = req.body.tglPeriksa
    }
    if (req.body.hasil != null) {
        res.diagnosa.hasil = req.body.hasil
    }
    if (req.body.kodePasien != null) {
        res.diagnosa.kodePasien = req.body.kodePasien
    }
    if (req.body.kodeDokter != null) {
        res.diagnosa.kodeDokter = req.body.kodeDokter
    }
    if (req.body.kodeObat != null) {
        res.diagnosa.kodeObat = req.body.kodeObat
    }
    if (req.body.kodeTindakan != null) {
        res.diagnosa.kodeTindakan = req.body.kodeTindakan
    }
    if (req.body.kodeRuangan != null) {
        res.diagnosa.kodeRuangan = req.body.kodeRuangan
    }
    if (req.body.status != null) {
        res.diagnosa.status = req.body.status
    }

    try {
        await res.diagnosa.save()
        res.redirect(`/diagnosa/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete diagnosa
router.delete('/:id', getDiagnosa, async (req, res) => {
    try {
        await res.diagnosa.remove()
        res.redirect('/diagnosa')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router