const express  = require('express')
const path     = require('path')
const xphbs    = require('express-handlebars')
const app      = express()
const port     = 8000
const makeCrud = require('express-json-file-crud').makeCrud
const pasien   = makeCrud('pasien', './data')

// handlebars middleware
app.engine('handlebars', xphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// crud routes
app.use('/pasien', pasien)

// url controller
app.get('/', function (req, res) {
    res.render('dashboard');
});

// static file
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`web app listening on port ${port}!`))