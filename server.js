const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer()
const errorHandler = require('./middleware/errorHandler')
const { logger} = require('./middleware/logger')
const {port} = require('./appConfig.json')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger)
app.use('/',require('./routes/root'))
app.use('/mis',upload.none(),require('./routes/misRoutes'))
app.use('/user',require('./routes/userRoutes'))
app.use('/createuser',require('./routes/createUserRoute'))
app.use('/auth',require('./routes/authRoutes'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)
app.listen(port,()=>{console.log(`server running in port - ${port}`)})