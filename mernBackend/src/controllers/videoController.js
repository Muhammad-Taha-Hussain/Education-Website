const Video = require('../models/videoModel');

exports.uploadVideo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const videoPath = req.file.path;

        const newVideo = new Video({
            title,
            description,
            videoPath
        });

        await newVideo.save();
        res.status(201).json({ message: 'Video uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload video', error });
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve videos', error });
    }
};
