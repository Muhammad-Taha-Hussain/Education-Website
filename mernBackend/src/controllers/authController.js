const bcrypt = require('bcrypt');
const Register = require('../models/registerModel');


exports.loginUser = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const userLogin = await Register.findOne({ Email });

        if (!userLogin) {
            return res.status(404).send('Invalid login details');
        }

        const isMatch = await bcrypt.compare(Password, userLogin.Password);

        if (isMatch) {
            req.session.user = userLogin; // Store user in session
            return res.status(201).redirect(`/home/${userLogin._id}`);
        } else {
            return res.send('Invalid login details');
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Invalid login details');
    }
};

exports.registerUser = async (req, res) => {
    const { Name, Email, Password, cPassword } = req.body;
    const pic = req.file; // Multer stores file information in req.file

    try {
        // Check if a user with the same email already exists
        const existingUser = await Register.findOne({ Email });

        if (existingUser) {
            // If a user with the same email exists, return an error response
            return res.status(400).json({ message: "Email already registered" });
        }

        // If passwords match, proceed with registration
        if (Password === cPassword) {
            const registerUser = new Register({
                Name,
                Email,
                Password,
                cPassword,
                pic: {
                    title: pic ? pic.originalname : '',
                    description: 'Profile Picture',
                    image: pic ? `/uploads/${pic.filename}` : ''
                }
            });

            await registerUser.save();
            // Pass videos array (empty for now) when rendering home view
            const videos = [];
            req.session.user = registerUser; // Store user in session
            return res.status(201).redirect(`/home/${registerUser._id}`);
        } else {
            return res.send("Passwords do not match");
        }
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(400).send(error);
    }
};
