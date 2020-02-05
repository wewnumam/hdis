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
            title: 'Data Pasien',
            pasien: content
        })
    })

})

// get single pasien
router.get('/:id', getPasien, async (req, res) => {
    res.render('detPasien', {
        title: 'Detail Pasien',
        pasien: res.pasien
    })
})

// create pasien
// router.post('/', (req, res) => {
//     const pasienBaru = {
//         id: req.body.id,
//         nama: req.body.nama,
//         jk: req.body.jk,
//         usia: req.body.usia,
//         nik: req.body.nik,
//         alamat: req.body.alamat,
//         noTelp: req.body.noTelp,
//         tglDaftar: req.body.tglDaftar,
//         jenPeriksa: req.body.jenPeriksa
//     }

//     fs.writeFileSync('/pasien', pasienBaru)

//     res.redirect('/pasien')
// })

module.exports = router