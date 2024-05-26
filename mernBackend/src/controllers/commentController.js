const Comment = require('../models/commentModel');
const Video = require('../models/videoModel');


exports.createComment = async (req, res) => {
    try {
        const { content, videoId } = req.body;
        const userId = req.params.userId;

        if (!content || !videoId || !userId) {
            return res.status(400).json({ error: 'Content, videoId, and userId are required' });
        }

        const comment = new Comment({
            content,
            user: userId,
            video: videoId
        });

        await comment.save();

        // Add the comment to the video's comments array
        await Video.findByIdAndUpdate(videoId, { $push: { comments: comment._id } });

        res.redirect(`/watch-video/${userId}/${videoId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating comment' });
    }
};

exports.editComment = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.params.userId;
        const videoId = req.params.videoId;
        const comment = await Comment.findByIdAndUpdate(req.params.id, { content }, { new: true });
        res.redirect(`/watch-video/${userId}/${videoId}`);
    } catch (error) {
        res.status(500).json({ error: 'Error editing comment' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const userId = req.params.userId;
        const videoId = req.params.videoId;
        await Comment.findByIdAndDelete(req.params.id);
        // Remove the comment ID from the video's comments array
        await Video.findByIdAndUpdate(videoId, {
            $pull: { comments: req.params.id }
        });
        res.redirect(`/watch-video/${userId}/${videoId}`);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting comment' });
    }
};

exports.replyToComment = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.params.userId;
        const videoId = req.params.videoId;
        const parentComment = await Comment.findById(req.params.id);

        if (!parentComment) {
            return res.status(404).json({ error: 'Parent comment not found' });
        }
       // Create a new reply
        const reply = new Comment({
            content,
            user: req.params.userId,    //shi se user jo reply kar rha hai wo lena hai
            video: parentComment.video,   
            parentComment: parentComment._id
        });

        await reply.save();
        parentComment.replies.push(reply._id);
        await parentComment.save();

        res.redirect(`/watch-video/${userId}/${videoId}`);
    } catch (error) {
        res.status(500).json({ error: 'Error replying to comment' });
    }
};

exports.getCommentsByVideo = async (req, res) => {
    try {
        const comments = await Comment.find({ video: req.params.videoId }).populate('user').populate({
            path: 'replies',
            populate: { path: 'user' }
        }).exec();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments' });
    }
};
