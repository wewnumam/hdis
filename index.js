const express        = require('express')
const path           = require('path')
const xphbs          = require('express-handlebars')
const app            = express()
const port           = 8000
const methodOverride = require('method-override')
const mongoose       = require('mongoose')

// connect to mongodb
mongoose
    .connect('mongodb://localhost:27017/rumahsakit',  {
        useNewUrlParser   : true,
        useFindAndModify  : false,
        useCreaitteIndex    : true,
        useUnifiedTopology: true
    })
    .then(() => console.log("mongodb connected!"))
    .catch((err) => console.log(err))

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
    helpers      : {
        // Function to do basic mathematical operation in handlebar
        persen: function (lvalue, rvalue) {
            lvalue  = parseFloat(lvalue)
            rvalue  = parseFloat(rvalue)
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
app.use('/pasien', require('./routes/pasien'))
app.use('/', require('./routes/dashboard'))

// static file
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`web app listening on port ${port}!`))