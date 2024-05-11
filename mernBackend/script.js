const express = require('express')
const app = express()

app.use(function (req, res, next) {
    console.log("Number 360")
    next()
})
app.get('/',async function(req, res) {
    res.send("Hello World this is santosh")
})
app.get('/profile',async function(req, res) {
    console.log(req)
    res.send("Hello World this is santosh from profile")
})
app.listen(3010);