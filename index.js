const express        = require('express')
const path           = require('path')
const xphbs          = require('express-handlebars')
const app            = express()
const port           = 8000
const makeCrud       = require('express-json-file-crud').makeCrud
const methodOverride = require('method-override')
const pasien         = require('./data/pasien')

// override method
app.use(methodOverride('_method'))

// body perse middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// handlebars middleware
app.engine('handlebars', xphbs({
    defaultLayout: 'main',
    helpers      : {
        // Function to do basic mathematical operation in handlebar
        persen: function (lvalue, rvalue) {
            lvalue  = parseFloat(lvalue)
            rvalue  = parseFloat(rvalue)
            percent = lvalue / rvalue * 100
            return percent
        }
    }
}))
app.set('view engine', 'handlebars')

// crud routes
app.use('/pasien', makeCrud('pasien', './data'))

// url controller
app.get('/', (req, res) => {
    res.render('dashboard', {
        title   : 'Dashboard',
        pasien  : pasien.length,
        pasienLk: pasien.filter(a => a.jk == 'laki-laki').length,
        pasienPr: pasien.filter(a => a.jk == 'perempuan').length,
        pasienRj: pasien.filter(a => a.jenPeriksa == 'rawat jalan').length,
        pasienRi: pasien.filter(a => a.jenPeriksa == 'rawat inap').length
    })
})
app.get('/users', (req, res) => {
    res.render('users', {
        title: 'User',
        pasien
    })
})
app.get('/users/pasien/:id', (req, res) => {
    res.render('pasien', {
        title : 'Detail Pasien',
        pasien: pasien.filter(a => a.id == req.params.id)
    })
})

// static file
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`web app listening on port ${port}!`))