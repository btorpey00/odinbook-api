var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.get('/', postController.post_list);
router.post('/', postController.create_post);

router.post('/:post_id/delete', postController.delete_post);
router.put('/:post_id/like', postController.like_post);

router.get('/:post_id/comments', commentController.get_comments);
router.post('/:post_id/comments', commentController.add_comment);
router.post('/:post_id/comments/:comment_id', commentController.delete_comment);

router.get('/:post_id', postController.get_single_post);



module.exports = router;