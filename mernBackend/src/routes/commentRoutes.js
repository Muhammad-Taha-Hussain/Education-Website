const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.post('/add-comment/:userId/:videoId', commentController.createComment);
router.post('/edit-comment/:userId/:videoId/:id', commentController.editComment);
router.post('/delete-comment/:userId/:videoId/:id', commentController.deleteComment);
router.post('/reply-comment/:userId/:videoId/:id', commentController.replyToComment);
router.get('/comments/:videoId', commentController.getCommentsByVideo);

module.exports = router;
