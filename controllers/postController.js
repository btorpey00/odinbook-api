const Post = require('../models/post');
const asyncHandler= require('express-async-handler');

exports.post_list = asyncHandler(async(req, res, next) => {
    const postsByFriends = await Post.find({ user: {$in: req.currentUser.friends }}).sort({ date: -1 }).limit(20).exec();
    res.status(201).json(postsByFriends)
});

exports.get_single_post = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.post_id).exec();
    res.status(201).json(post);
});

exports.create_post = asyncHandler(async(req, res, next) => {
    const post = new Post({
        content: req.body.content,
        image: req.body.image,
        author: req.currentUser
    });
    await post.save();
    res.status(201).json({ 'message': 'Post created' });
});

exports.delete_post = asyncHandler(async(req, res, next) => {
    await Post.findByIdAndRemove(req.params.post_id);
    res.status(200).json({ 'message': 'Post removed' });
});

exports.like_post = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.post_id).exec();
    let newLikeList = [];
    if (post.likes.includes(req.params.post_id)) {
        newLikeList = post.likes.filter(like => like !== req.currentUser);
    } else {
        newLikeList = post.likes.push(req.currentUser);
    }
    await Post.updateOne( { _id: req.params.post_id }, {$set: {likes: newLikeList }});
    res.status(200).json({ 'message': 'Updated likes'})
});