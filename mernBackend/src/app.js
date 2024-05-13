// Import required modules
const express = require("express");
const path = require("path")
const ejs = require("ejs")
const bcrypt = require('bcrypt'); // Import bcrypt module
const app = express()
require("./db/conn")
const Register = require("./models/register");


const port = process.env.PORT || 3000

const static_path = path.join(path.join(__dirname, "../public"));
const template_path = path.join(path.join(__dirname, "../templates/views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))

// setting the home page
app.set("view engine", "ejs")
app.set("views", template_path)


app.get("/", (req, res) => { 
    res.render("login")
});

app.get("/register", (req, res) => { 
    res.render("register")
});

app.get("/home", (req, res) => { 
    res.render("home")
});

// login checked
app.post('/', async (req, res) => {
    // Extract credentials from the request body
    const { Email, Password } = req.body;

    try {
        // Find the user with the provided email in the database
        const userLogin = await Register.findOne({ Email: Email });

        // If user is not found, return error
        if (!userLogin) {
            res.status(404).send('/');
        }

        // Compare the provided password with the hashed password stored in the database
        //const passwordMatch = await bcrypt.compare(Password, Register.Password);

        // If passwords don't match, return error
        const isMatch = bcrypt.compare(Password, userLogin.Password)

        // Passwords match, user is authenticated
        // You can create a session or JWT token here to authenticate the user
        // For now, send a success response
        if (isMatch) {
            res.status(201).render('home');
        } else {
            res.send('Login invalid details')
        }
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Login invalid details');
    }
});

//create a new user in our database
app.post("/register", async (req, res) => { 
    try {
        const password = req.body.Password;
        console.log(password)
        const cpassword = req.body.cPassword;
        if(password === cpassword) {
            const registerUser = new Register({
                Name: req.body.Name,
                Email: req.body.Email,
                Password: password,
                cPassword: cpassword,
                pic: req.body.pic
            })
            registerUser.save()
            .then(Register => {
                console.log('User saved:', Register);
                res.status(201).render("home")
            })
            .catch(err => {
                console.error('Error saving user:', err);
                res.status(400).send('Validation failed: ' + err.message); // Send a response with the validation error message
            });

        } else {
            res.send("Password not matches")
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
});

//console.log(path.join(__dirname, "../templates/views"))
// console.log(path.join(__dirname, "../public"))

app.listen(port, () => {
    console.log(`server is running at port ${port}`)    
} );