const express = require('express')
const router = express.Router()
const Pengguna = require('../models/pengguna')
const session = require('express-session')

router.get('/', (req, res, next) => {
    res.redirect('/auth/login')
})

// get pengguna
async function getPengguna(req, res, next) {
    try {
        pengguna = await Pengguna.findById(req.params.id)
        if (pengguna == null) {
            return res.status(404).json({
                message: 'Cant find pengguna'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.pengguna = pengguna
    next()
}

// login form
router.get('/login', (req, res, next) => {
    Pengguna.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('login', {
            user: req.session.user,
            title: 'Login'
        })
    })
})

// signup form
router.get('/signup', (req, res, next) => {
    Pengguna.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        res.render('signup', {
            title: 'Signup'
        })
    })
})

// auth login
router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    Pengguna.find((err, content) => {
        if (err) throw res.json({
            message: err.message
        })
        content = JSON.parse(JSON.stringify(content))
        if (content.filter(p => p.username==username && p.password==password).length == 0) {
            console.log('pengguna tidak ada atau password salah')
            res.redirect('/auth/login')
        } else {
            req.session.user = content.filter(p => p.username==username)
            req.session.role = String
            req.session.user.forEach(element => {
                req.session.role = element.role
            });
            res.redirect('/')
        }
    })  
})

// auth logout
router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy(function(err) {
          if(err) {
            return next(err)
          } else {
            return res.redirect('/')
          }
        })
    } else {
        return res.redirect('/auth/login')
    }
})

// auth signup
router.post('/signup', async (req, res) => {
    const pengguna = new Pengguna({
        username   : req.body.username,
        password  : req.body.password,
        role  : req.body.role
    })
    try {
        await pengguna.save()
        res.redirect('/auth/login')
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// update pengguna
router.patch('/:id', getPengguna, async (req, res) => {
    if (req.body.nama != null) {
        res.pengguna.nama = req.body.nama
    }
    if (req.body.biaya != null) {
        res.pengguna.biaya = req.body.biaya
    }

    try {
        await res.pengguna.save()
        res.redirect(`/pengguna`)
    } catch {
        res.status(400).json({
            message: err.message
        })
    }
})

// delete pengguna
router.delete('/:id', getPengguna, async (req, res) => {
    try {
        await res.pengguna.remove()
        res.redirect('/pengguna')
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router