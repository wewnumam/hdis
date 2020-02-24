const express = require('express')
const router  = express.Router()
const Ruangan = require('../models/ruangan')

// get ruangan
async function getRuangan(req, res, next) {
    try {
        ruangan = await Ruangan.findById(req.params.id)
        if (ruangan == null) {
            return res.status(404).json({
                message: 'Cant find ruangan'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.ruangan = ruangan
    next()
}

// get all ruangan
router.get('/', (req, res, next) => {
    if (req.session.user) {
        if (req.session.role == 'dokter') {
            return res.redirect('/')
        }
        Ruangan.find((err, content) => {
            if (err) throw res.json({
                message: err.message
            })
            content = JSON.parse(JSON.stringify(content))
            res.render('ruangan', {
                title  : 'Data ruangan',
                user: req.session.user,
                ruangan: content
            })
        })
    } else {
        return res.redirect('/auth/login')
    }
})

// get single ruangan
router.get('/:id', (req, res, next) => {
    if (req.session.user) {
        if (req.session.role == 'dokter') {
            return res.redirect('/')
        }
        Ruangan.find((err, content) => {
            if (err) throw res.json({
                message: err.message
            })
            content = JSON.parse(JSON.stringify(content))
            res.render('detRuangan', {
                title  : 'Detail Ruangan',
                user: req.session.user,
                ruangan: content.filter(c => c._id == req.params.id)
            })
        })
    } else {
        return res.redirect('/auth/login')
    }
})

// create ruangan
router.post('/', async (req, res) => {
    const ruangan = new Ruangan({
        nama   : req.body.nama,
        kelas  : req.body.kelas,
        noKamar: req.body.noKamar,
        kondisi : req.body.kondisi,
        tarif  : req.body.tarif
    })
    try {
        await ruangan.save()
        res.redirect('/ruangan')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update ruangan
router.patch('/:id', getRuangan, async (req, res) => {
    if (req.body.nama != null) {
        res.ruangan.nama = req.body.nama
    }
    if (req.body.kelas != null) {
        res.ruangan.kelas = req.body.kelas
    }
    if (req.body.noKamar != null) {
        res.ruangan.noKamar = req.body.noKamar
    }
    if (req.body.kondisi != null) {
        res.ruangan.kondisi = req.body.kondisi
    }
    if (req.body.tarif != null) {
        res.ruangan.tarif = req.body.tarif
    }

    try {
        await res.ruangan.save()
        res.redirect(`/ruangan/${req.params.id}`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }

})

// delete ruangan
router.delete('/:id', getRuangan, async (req, res) => {
    try {
        await res.ruangan.remove()
        res.redirect('/ruangan')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router