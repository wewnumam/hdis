const express = require('express')
const router  = express.Router()
const Tindakan = require('../models/tindakan')

// get tindakan
async function getTindakan(req, res, next) {
    try {
        tindakan = await Tindakan.findById(req.params.id)
        if (tindakan == null) {
            return res.status(404).json({
                message: 'Cant find tindakan'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.tindakan = tindakan
    next()
}

// get all tindakan
router.get('/', (req, res, next) => {
    Tindakan.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('tindakan', {
            title  : 'Data Tindakan',
            tindakan: content
        })
    })

})

// create tindakan
router.post('/', async (req, res) => {
    const tindakan = new Tindakan({
        nama   : req.body.nama,
        biaya  : req.body.biaya
    })
    try {
        await tindakan.save()
        res.redirect('/tindakan')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update tindakan
router.patch('/:id', getTindakan, async (req, res) => {
    if (req.body.nama != null) {
        res.tindakan.nama = req.body.nama
    }
    if (req.body.biaya != null) {
        res.tindakan.biaya = req.body.biaya
    }

    try {
        await res.tindakan.save()
        res.redirect(`/tindakan`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete tindakan
router.delete('/:id', getTindakan, async (req, res) => {
    try {
        await res.tindakan.remove()
        res.redirect('/tindakan')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router