require("dotenv").config()
const port = process.env.PORT||5000
const express = require('express')
const cors = require("cors")
const dbConnect = require('./config/db')
const UserRoute = require("./routes/user.routes")
const JobRoute = require("./routes/job.routes")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => res.send('server running'))
app.use("/user",UserRoute)
app.use("/job",JobRoute)


app.listen(port, async() => {
    await dbConnect()
    console.log(`server started on ${port}`)
})