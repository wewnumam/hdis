const express = require('express')
const path = require('path')
const session = require('express-session')
const xphbs = require('express-handlebars')
const app = express()
const port = 8000
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/rumahsakit', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

//use sessions for tracking logins
app.use(session({
    secret: 'suruh sana suruh sini tunggu gaji',
    resave: true,
    saveUninitialized: false
}))

// override method
app.use(methodOverride('_method'))

// body perse middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// handlebars middleware
app.engine('handlebars', xphbs({
    defaultLayout: 'main',
    helpers: {
        // Function to do basic mathematical operation in handlebar
        persen: function (lvalue, rvalue) {
            lvalue = parseFloat(lvalue)
            rvalue = parseFloat(rvalue)
            percent = lvalue / rvalue * 100
            return percent
        },
        incremented: function (index) {
            index++;
            return index;
        }
    }
}))
app.set('view engine', 'handlebars')

// routes
app.use('/', require('./routes/dashboard'))
app.use('/pasien', require('./routes/pasien'))
app.use('/dokter', require('./routes/dokter'))
app.use('/perawat', require('./routes/perawat'))
app.use('/obat', require('./routes/obat'))
app.use('/resep', require('./routes/resep'))
app.use('/ruangan', require('./routes/ruangan'))
app.use('/tindakan', require('./routes/tindakan'))
app.use('/diagnosa', require('./routes/diagnosa'))
app.use('/rm', require('./routes/rm'))
app.use('/administrasi', require('./routes/administrasi'))
app.use('/auth', require('./routes/auth'))

// static file
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`web app listening on port ${port}!`))