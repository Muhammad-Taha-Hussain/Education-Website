const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    uploaderName: {
        type: String,
        required: true
    },
    uploaderAvatar: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
