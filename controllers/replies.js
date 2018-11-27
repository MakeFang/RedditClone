const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const User = require("../models/user.js");

module.exports = app => {

    app.get("/posts/:postId/comments/:commentId/replies/new", (req,res)=>{
        let post;
        Post.findById(req.params.postId)
        .then((p)=>{
            post = p;
            return Comment.findById(req.params.commentId);
        })
        .then((comment)=>{
            res.render("replies-new", {post: post, comment: comment});
        })
        .catch((err)=>{
            console.log(err.message);
        })
    });

    app.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
        console.log(req.body);
        req.body.author = req.user._id;
        req.body.postId = req.params.postId;
        let newComment = new Comment(req.body);

        newComment.save().then((newComment)=>{
            return Post.findById(req.params.postId);
        })
        // Post.findById(req.params.postId)
        .then((post)=>{
            // FIND THE CHILD COMMENT
            var comment = post.comments.id(req.params.commentId);
            // console.log(`comment is ${comment}`);
            // ADD THE REPLY
            // req.body.author = req.user._id;
            // req.body.postId = req.params.postId;
            // let newComment = new Comment(req.body);
            comment.comments.unshift(newComment);
            // SAVE THE CHANGE TO THE PARENT DOCUMENT
            return post.save();
        })
        .then((post)=>{
            res.redirect("/posts/" + post._id);
        })
        .catch(err => {
            console.log(err.message);
        });
    });

};
