// src/routes/videoRoutes.js

const express = require('express');
const multer = require('multer');
const Video = require('../models/videoModel');
const { ensureAuthenticated } = require('../middlewares/auth');
const path = require('path');

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'uploaderAvatar' || file.fieldname === 'thumbnail') {
            cb(null, 'public/images'); // Directory for images
        } else if (file.fieldname === 'video') {
            cb(null, 'public/videos'); // Directory for videos
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100MB limit for video files
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|mp4|mov/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images and Videos Only!');
        }
    }
}).fields([{ name: 'video', maxCount: 1 }, { name: 'uploaderAvatar', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);

router.post('/upload/:id', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to upload files', error: err });
        }

        const { title, uploaderName } = req.body;
        const uploaderAvatar = req.files['uploaderAvatar'][0].path.split('\\').pop();
        const thumbnail = req.files['thumbnail'][0].path.split('\\').pop();
        const videoPath = req.files['video'][0].path.split('\\').pop();

        if (!uploaderName || !uploaderAvatar || !thumbnail || !videoPath) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const newVideo = new Video({
                title,
                uploaderName,
                uploaderAvatar,
                thumbnail,
                path: videoPath,
            });

            await newVideo.save();
            res.redirect(`/home/${req.params.id}`); // Redirect to the videos page
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error });
        }
    });
});



module.exports = router;
