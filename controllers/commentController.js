const Comment = require('../models/comment');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

exports.add_comment = asyncHandler(async(req, res, next) => {
    const comment = new Comment ({
        content: req.body.content,
        author: req.currentUser,
        post: req.params.post_id
    });
    await comment.save();
    res.status(201).json({ 'message': 'Comment created' });
});

exports.delete_comment = asyncHandler(async(req, res, next) => {
    await Comment.findByIdAndRemove(req.params.comment_id);
    res.status(200).json({ 'message': 'Comment deleted' });
});

exports.get_comments = asyncHandler(async(req, res, next) => {
    const commentsForPost = await Comment.find({ post: { $in: req.params.post_id }}).sort({ date: -1 }).populate('author').exec();
    res.status(201).json(commentsForPost);
});
