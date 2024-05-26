const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionExpiredMiddleware = require('./middlewares/sessionExpiredMiddleware');
const passport = require('./config/passport');
// Import routes
const videoRoutes = require('./routes/videoRoutes');
const viewRoutes = require('./routes/viewRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

require('./db/conn');

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "./templates/views");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(static_path));
app.use('/uploads', express.static('uploads'));
// Apply sessionExpired middleware to all routes
app.use(sessionExpiredMiddleware);


app.use(session({
    secret: 'Taha Hussain',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/registration' }),
    cookie: { maxAge: 10000 } // 10 seconds
}));

//passport middlewares
app.use(passport.initialize());
app.use(passport.session());


// Setting the view engine
app.set('view engine', 'ejs');
app.set('views', template_path);

// Use routes
app.use('/', videoRoutes);
app.use('/', commentRoutes);
app.use('/', viewRoutes);
app.use('/', authRoutes);

// Home route
app.get('/', (req, res) => { 
    res.render('login');
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
