require('dotenv').config()

// ExpressJS is a routing and middleware web framework that we will use 
// to simplify our Nodejs backend.
const express = require('express')
const app = express()

// Middlewares initialization.
const cors = require('cors')

// Middlewares used.
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3006",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.urlencoded({extended: true}))

// Routes and error handler initialization.
const inventoryRoutes = require('./routes/inventoryRoutes')
const apiErrorHandler = require('./error/apiErrorHandler')

// Direct to routes based on left-most relative pathname. If left-most relative pathname does have
// routes attached to it, then 404 error will be sent back by apiErrorHandler. 
app.get('/', (req, res)=>{
    res.redirect('/inventory')
})
app.use('/inventory', inventoryRoutes)
app.use(apiErrorHandler)

// Port initialization.
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})