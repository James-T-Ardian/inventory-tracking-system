require('dotenv').config()

// Middleware initialization
const cors = require('cors')
const express = require('express')
const app = express()

// Middlewares used
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3006",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.urlencoded({extended: true}))


// Routes used
app.get('/', (req, res)=>{
    res.redirect('/inventory')
})

app.get('*', (req, res)=>{
    res.status(404).json({msg: "Resource not found"})
})


// Port
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})