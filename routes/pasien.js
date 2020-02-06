const express = require('express')
const router  = express.Router()
const Pasien  = require('../models/pasien')

// get pasien
async function getPasien(req, res, next) {
    try {
        pasien = await Pasien.findById(req.params.id)
        if (pasien == null) {
            return res.status(404).json({
                message: 'Cant find pasien'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.pasien = pasien
    next()
}

// get all pasien
router.get('/', (req, res, next) => {
    Pasien.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('pasien', {
            title : 'Data Pasien',
            pasien: content
        })
    })

})

// get single pasien
router.get('/:id', (req, res, next) => {
    Pasien.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('detPasien', {
            title : 'Detail Pasien',
            pasien: content.filter(c => c._id == req.params.id)
        })
    })
})

// create pasien
router.post('/', async (req, res) => {
    const pasien = new Pasien({
        nama      : req.body.nama,
        jk        : req.body.jk,
        usia      : req.body.usia,
        nik       : req.body.nik,
        alamat    : req.body.alamat,
        noTelp    : req.body.noTelp,
        tglDaftar : req.body.tglDaftar,
        jenPeriksa: req.body.jenPeriksa
    })
    try {
        await pasien.save()
        res.redirect('/pasien')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update pasien
router.patch('/:id', getPasien, async (req, res) => {
    if (req.body.nama != null) {
        res.pasien.nama = req.body.nama
    }
    if (req.body.jk != null) {
        res.pasien.jk = req.body.jk
    }
    if (req.body.usia != null) {
        res.pasien.usia = req.body.usia
    }
    if (req.body.nik != null) {
        res.pasien.nik = req.body.nik
    }
    if (req.body.alamat != null) {
        res.pasien.alamat = req.body.alamat
    }
    if (req.body.noTelp != null) {
        res.pasien.noTelp = req.body.noTelp
    }
    if (req.body.tglDaftar != null) {
        res.pasien.tglDaftar = req.body.tglDaftar
    }
    if (req.body.jenPeriksa != null) {
        res.pasien.jenPeriksa = req.body.jenPeriksa
    }

    try {
        await res.pasien.save()
        res.redirect(`/pasien/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete pasien
router.delete('/:id', getPasien, async (req, res) => {
    try {
        await res.pasien.remove()
        res.redirect('/pasien')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router