const express = require("express")
const app = express()
app.set('view engine', 'ejs')
require('dotenv').config()
app.use(express.json())


const product = require('./routes/productroute')
app.use('/api', product)

app.get("/home", (req, res) => {
    res.status(200).json({
        successe : true,
        message: 'you are in home page'
    })
})
const port = (process.env.PORT || 4000)
app.listen(port, async () => {
    console.log(`Server is listening On http://localhost:${port}`)
})
