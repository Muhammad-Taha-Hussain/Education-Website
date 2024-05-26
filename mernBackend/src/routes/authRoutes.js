const express = require('express');
const multer = require('multer');
const path = require('path');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.post('/login', authController.loginUser);
router.post('/register', upload.single('pic') , authController.registerUser);

// Handle login
/*router.post('/login', passport.authenticate('local', {
    successRedirect: authController.registerUser,
    failureRedirect: '/login'
  }));*/
// Handle logout
router.get('/logout', (req, res) => {
   req.logout();
   res.redirect('/');
});
  


// Serving static files
router.use('/uploads', express.static(path.join(__dirname, '/uploads')));

module.exports = router;
