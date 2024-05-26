const express = require('express');
const router = express.Router();
const Video = require('../models/videoModel');
const { ensureAuthenticated } = require('../middlewares/auth');
const Register = require('../models/registerModel');
const userlogin = require('../controllers/authController');
const Comment = require('../models/commentModel');



// Route to display a single video by ID
router.get('/upload-video', async (req, res) => {
    try {
        const video = await Video.find();

        if (!video) {
            return res.status(404).send('Video not found');
        }

        res.render('videos', { video });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// Route to like a video
router.post('/like-video/:userId/:videoId', async (req, res) => {
    try {
        const { userId, videoId } = req.params;
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).send('Video not found');
        }

        // Check if the user already liked the video
        const userIndex = video.likes.indexOf(userId);
        if (userIndex === -1) {
            // User has not liked the video yet, add user to likes array
            video.likes.push(userId);
        } else {
            // User already liked the video, remove user from likes array
            video.likes.splice(userIndex, 1);
        }

        await video.save();
        res.redirect(`/watch-video/${userId}/${videoId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/upload-video/:id', (req, res) => {
    res.render('videos', { userId: req.params.id });
});

router.get('/home/:id' ,async (req, res) => { 
    try {
        // req.params.id will contain the value of the 'id' parameter in the URL
        const userId = req.params.id;
        const user = await Register.findById(userId);
        const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
        if (!user) {
            return res.status(404).send('User not found');
        }

        const videos = await Video.find();
        res.render("home", {
            userId: userId,
            userName: user.Name,
            userProfilePic: userProfilePic,
            videos: videos
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Server Error');
    }
});

router.get('/playlist/:id', async (req, res) => { 
    try {
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    const videos = await Video.find();
    res.render('playlist', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic,
        videos: videos });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Server Error');
    }
});

router.get('/profile/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('profile', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

router.get('/about/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('about', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

router.get('/courses/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('courses', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

router.get('/playlist/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('playlist', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

router.get('/contact/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('contact', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

router.get('/about/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('about', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

router.get('/update/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('update', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

router.get('/watch-video/:id/:videoId', async (req, res) => { 
    try {
      const userId = req.params.id;
      const user = await Register.findById(userId);
      const userProfilePic = user.pic.image || "/default-profile-pic.jpg";
      const video = await Video.findById(req.params.videoId).populate({
            path: 'comments',
            populate: {
            path: 'user replies',
            populate: { path: 'user' }
        }
    });
    const userHasLiked = video.likes.includes(userId);
    const comment = await Video.findById(video.comments)
      if (!video) {
        return res.status(404).send("Video not found");
      }

      res.render("watch-video", { 
        userId: userId,
        userName: user.name,
        userProfilePic: userProfilePic,
        video: video,
        comments: comment,
        userHasLiked: userHasLiked
    });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
});

router.get('/teachers/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('teachers', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

router.get('/teacher_profile/:id', async (req, res) => { 
    const userId = req.params.id;
    const user = await Register.findById(userId);
    const userProfilePic = user.pic.image || '/default-profile-pic.jpg';
    res.render('teacher_profile', { 
        userId: userId,
        userName: user.Name,
        userProfilePic: userProfilePic
     });
});

module.exports = router;
