const express= require('express')
require('./db/mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user')

const app = express()
const port = process.env.PORT || 3000
app.use(cors())

app.use(express.json())
app.use(userRoutes)
app.listen(port)