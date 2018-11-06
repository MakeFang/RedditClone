const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const post = new Schema({
    subreddit: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
},{
    timestamps: true
})

const Post = mongoose.model('Post', post);
module.exports = Post;
