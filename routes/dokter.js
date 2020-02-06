const express = require('express')
const router  = express.Router()
const Dokter  = require('../models/dokter')

// get dokter
async function getdokter(req, res, next) {
    try {
        dokter = await Dokter.findById(req.params.id)
        if (dokter == null) {
            return res.status(404).json({
                message: 'Cant find dokter'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.dokter = dokter
    next()
}

// get all dokter
router.get('/', (req, res, next) => {
    Dokter.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('dokter', {
            title : 'Data dokter',
            dokter: content
        })
    })

})

// get single dokter
router.get('/:id', (req, res, next) => {
    Dokter.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('detDokter', {
            title : 'Detail Dokter',
            dokter: content.filter(c => c._id == req.params.id)
        })
    })
})

// create dokter
router.post('/', async (req, res) => {
    const dokter = new Dokter({
        nama      : req.body.nama,
        jk        : req.body.jk,
        alamat    : req.body.alamat,
        noTelp    : req.body.noTelp,
        spesialis : req.body.spesialis,
        jamPraktek: req.body.jamPraktek,
        noPraktek : req.body.noPraktek
    })
    try {
        await dokter.save()
        res.redirect('/dokter')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update dokter
router.patch('/:id', getdokter, async (req, res) => {
    if (req.body.nama != null) {
        res.dokter.nama = req.body.nama
    }
    if (req.body.jk != null) {
        res.dokter.jk = req.body.jk
    }
    if (req.body.alamat != null) {
        res.dokter.alamat = req.body.alamat
    }
    if (req.body.noTelp != null) {
        res.dokter.noTelp = req.body.noTelp
    }
    if (req.body.spesialis != null) {
        res.dokter.spesialis = req.body.spesialis
    }
    if (req.body.jamPraktek != null) {
        res.dokter.jamPraktek = req.body.jamPraktek
    }
    if (req.body.noPraktek != null) {
        res.dokter.noPraktek = req.body.noPraktek
    }

    try {
        await res.dokter.save()
        res.redirect(`/dokter/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete dokter
router.delete('/:id', getdokter, async (req, res) => {
    try {
        await res.dokter.remove()
        res.redirect('/dokter')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router