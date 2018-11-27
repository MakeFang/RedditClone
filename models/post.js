const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;
const Comment = require('./comment.js')

const post = new Schema({
    subreddit: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    comments: [Comment.schema],
    author : { type: Schema.Types.ObjectId, ref: "User", required: true }
},{
    timestamps: true
})

const Post = mongoose.model('Post', post);
module.exports = Post;
