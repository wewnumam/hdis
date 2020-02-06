const express = require('express')
const router = express.Router()
const Obat = require('../models/obat')

// get obat
async function getObat(req, res, next) {
    try {
        obat = await Obat.findById(req.params.id)
        if (obat == null) {
            return res.status(404).json({
                message: 'Cant find obat'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.obat = obat
    next()
}

// get all obat
router.get('/', (req, res, next) => {
    Obat.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('obat', {
            title: 'Data obat',
            obat: content
        })
    })

})

// get single obat
router.get('/:id', (req, res, next) => {
    Obat.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('detObat', {
            title: 'Detail Obat',
            obat: content.filter(c => c._id == req.params.id)
        })
    })
})

// create obat
router.post('/', async (req, res) => {
    const obat = new Obat({
        nama    : req.body.nama,
        kategori: req.body.kategori,
        golongan: req.body.golongan,
        tglExp  : req.body.tglExp,
        harga   : req.body.harga,
        jumlah  : req.body.jumlah
    })
    try {
        await obat.save()
        res.redirect('/obat')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update obat
router.patch('/:id', getObat, async (req, res) => {
    if (req.body.nama != null) {
        res.obat.nama = req.body.nama
    }
    if (req.body.kategori != null) {
        res.obat.kategori = req.body.kategori
    }
    if (req.body.golongan != null) {
        res.obat.golongan = req.body.golongan
    }
    if (req.body.tglExp != null) {
        res.obat.tglExp = req.body.tglExp
    }
    if (req.body.jumlah != null) {
        res.obat.jumlah = req.body.jumlah
    }
    if (req.body.harga != null) {
        res.obat.harga = req.body.harga
    }

    try {
        await res.obat.save()
        res.redirect(`/obat/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete obat
router.delete('/:id', getObat, async (req, res) => {
    try {
        await res.obat.remove()
        res.redirect('/obat')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router