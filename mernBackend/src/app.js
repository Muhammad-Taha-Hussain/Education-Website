const express = require("express");
const path = require("path")
const ejs = require("ejs")
const app = express()
const db = require("./db/conn")


const port = process.env.PORT || 3000

const static_path = path.join(path.join(__dirname, "../public"));
const template_path = path.join(path.join(__dirname, "../templates/views"));

app.use(express.static(static_path))

// setting the home page
app.set("view engine", "ejs")
app.set("views", template_path)


app.get("/", (req, res) => { 
    res.render("register")
});

app.get("/home", (req, res) => { 
    res.render("home")
});

//console.log(path.join(__dirname, "../templates/views"))
// console.log(path.join(__dirname, "../public"))

app.listen(port, () => {
    console.log(`server is running at port ${port}`)    
} );