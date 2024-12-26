const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const {withAuth} = require('../../utils/auth');


// CREATE a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});


// UPDATE a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (deletePost){
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// CREATE a new comment
router.post('/:id/comments', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            post_id: req.params.id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a comment
router.delete('/comment/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (deleteComment) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

