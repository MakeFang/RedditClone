const Post = require('../models/post.js')
//
// function posts(app){
//
//     app.get('/', (req, res)=>{
//         // res.send('Hello World');
//         res.render('home');
//     })
//
//     app.get('/posts/new', (req,res)=>{
//         res.render('posts-new');
//     })
//
//     app.post('/posts', (req,res)=>{
//         console.log(req.body);
//         Post.create(req.body).then((post)=>{
//             console.log(post);
//             res.redirect('/');
//         }).catch((err)=>{
//             console.log(err.message);
//         })
//     })
//
//     app.listen(process.env.PORT || 5000, () => {
//         console.log('App listening on port 5000!');
//     })
//
// }
//
// module.exports = posts;

module.exports = app => {

    app.get('/', (req, res)=>{
        // res.send('Hello World');
        res.render('home');
    })

    app.get('/posts', (req,res)=>{
        Post.find().then((posts)=>{
            res.render("posts-index", {posts: posts});
        }).catch((err)=>{
            console.log(err.message);
        })
    })

    app.get('/posts/new', (req,res)=>{
        res.render('posts-new');
    })

    app.get('/posts/:postId', (req,res)=>{
        Post.findById(req.params.postId).then((post)=>{
            res.render('post-show', {post: post});
        }).catch((err)=>{
            console.log(err.message);
        })
    })

    app.post('/posts', (req,res)=>{
        console.log(req.body);
        Post.create(req.body).then((post)=>{
            console.log(post);
            res.redirect('/');
        }).catch((err)=>{
            console.log(err.message);
        })
    })

    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render("posts-index", { posts });
        })
        .catch(err => {
            console.log(err);
        });
    });

    app.listen(process.env.PORT || 5000, () => {
        console.log('App listening on port 5000!');
    })

}
