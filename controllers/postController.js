const Post = require('../models/post');
const asyncHandler= require('express-async-handler');

exports.post_list = asyncHandler(async(req, res, next) => {
    const postsByFriends = await Post.find({ user: {$in: currentUser.friends }}).sort({ date: -1 }).limit(20).exec();
    res.json(posts: postsByFriends)
});

exports.get_single_post = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
    res.json({ 'post': post });
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
    await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({ 'message': 'Post removed' });
});

exports.like_post = asyncHandler(async(req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
    let newLikeList = [];
    if (post.likes.includes(req.params.id)) {
        newLikeList = post.likes.filter(like => like !== currentUser);
    } else {
        newLikeList = post.likes.push(currentUser);
    }
    await Post.updateOne( { _id: req.params.id }, {$set: {likes: newLikeList }});
    res.status(200).json({ 'message': 'Updated likes'})
});