const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer()
const errorHandler = require('./middleware/errorHandler')
const { logEvents, logger} = require('./middleware/logger')
const {port} = require('./appConfig.json')
const session = require('express-session')
const {createClient} = require('redis')
const RedisStore = require("connect-redis").default
const isAuth = require('./middleware/auth')
let redisClient = createClient()

redisClient.connect().then((resp)=>{
    logEvents(`Redis Connected`, 'infoLog.log')
    logEvents(`Server running in ${port}`, 'infoLog.log')
    console.log('Redis Connected');
    app.listen(port,()=>{console.log(`server running in port - ${port}`)})
}).catch((err)=>{
    console.log(`${err.name}:${err.message}`);
    logEvents(`${err.name}: ${err.message}`, 'errLog.log')
})


// Initialize store.
let redisStore = new RedisStore({
client: redisClient,
prefix: "tool.db_session:",
})
app.use(
    session({
        store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
    secret: "peter griffin",
    })
)
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use(logger)
app.use('/mis',upload.none(),isAuth,require('./routes/misRoutes'))
app.use('/user',isAuth,require('./routes/userRoutes'))
app.use('/createuser',require('./routes/createUserRoute'))
app.use('/',require('./routes/authRoutes'))
app.use('/home',isAuth,require('./routes/homeRoute'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.render('404')
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)


