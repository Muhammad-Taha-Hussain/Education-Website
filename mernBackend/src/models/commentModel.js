const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { 
        type: String, 
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    video: { 
        type: Schema.Types.ObjectId, 
        ref: 'Video',
        required: true 
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
