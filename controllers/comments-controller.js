const Comment = require('../models/comment');
const Post = require('../models/post.js');
const User = require('../models/user.js')

module.exports = function(app) {

    app.post("/posts/:postId/comments", function(req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        let comment = new Comment(req.body);
        comment.author = req.user._id;

        // SAVE INSTANCE OF Comment MODEL TO DB
        comment.save().then((comment) => {
            return Post.findById(req.params.postId);
        })
        .then((post)=>{
            post.comments.unshift(comment);
            return post.save();
        })
        .then((post)=>{
            return User.findById(req.user._id);
            // res.redirect(`/`);
        })
        .then((user)=>{
            user.comments.unshift(comment);
            user.save();
            res.redirect(`/posts/${req.params.postId}`);
        })
        .catch(err => {
            console.log(err);
        });
    });

};
