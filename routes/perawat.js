const express = require('express')
const router  = express.Router()
const Perawat = require('../models/perawat')

// get perawat
async function getPerawat(req, res, next) {
    try {
        perawat = await Perawat.findById(req.params.id)
        if (perawat == null) {
            return res.status(404).json({
                message: 'Cant find perawat'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.perawat = perawat
    next()
}

// get all perawat
router.get('/', (req, res, next) => {
    Perawat.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('perawat', {
            title  : 'Data Perawat',
            perawat: content
        })
    })

})

// get single perawat
router.get('/:id', (req, res, next) => {
    Perawat.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('detPerawat', {
            title  : 'Detail perawat',
            perawat: content.filter(c => c._id == req.params.id)
        })
    })
})

// create perawat
router.post('/', async (req, res) => {
    const perawat = new Perawat({
        nama     : req.body.nama,
        jk       : req.body.jk,
        alamat   : req.body.alamat,
        noTelp   : req.body.noTelp,
        kodeRuang: req.body.kodeRuang,
        jamJaga  : req.body.jamJaga
    })
    try {
        await perawat.save()
        res.redirect('/perawat')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update perawat
router.patch('/:id', getPerawat, async (req, res) => {
    if (req.body.nama != null) {
        res.perawat.nama = req.body.nama
    }
    if (req.body.jk != null) {
        res.perawat.jk = req.body.jk
    }
    if (req.body.alamat != null) {
        res.perawat.alamat = req.body.alamat
    }
    if (req.body.noTelp != null) {
        res.perawat.noTelp = req.body.noTelp
    }
    if (req.body.kodeRuang != null) {
        res.perawat.kodeRuang = req.body.kodeRuang
    }
    if (req.body.jamJaga != null) {
        res.perawat.jamJaga = req.body.jamJaga
    }

    try {
        await res.perawat.save()
        res.redirect(`/perawat/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete perawat
router.delete('/:id', getPerawat, async (req, res) => {
    try {
        await res.perawat.remove()
        res.redirect('/perawat')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router