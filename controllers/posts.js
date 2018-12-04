const Post = require('../models/post.js')
const User = require('../models/user.js')
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

    app.get('/admin', (req, res)=>{
        // res.send('Hello World');
        // var currentUser = req.user;

        console.log(req.cookies);
        res.send('admin');
    })

    app.get('/', (req, res)=>{
        // res.send('Hello World');
        // var currentUser = req.user;

        console.log(req.cookies);
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
        // Post.findById(req.params.postId).populate('comments author').populate({
        //     path: 'comments',
        //     populate: {
        //         path: 'author',
        //         model: 'User'
        //     }
        // })
        Post.findById(req.params.postId)
        .populate('author', 'username')
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User'
            }
        })
        .then((post)=>{
            console.log(post);
            res.render('post-show', {post: post});
        })
        .catch((err)=>{
            console.log(err.message);
        })
    })

    app.post('/posts', (req,res)=>{
        let post = new Post(req.body);
        post.author = req.user._id;

        post.save()
        .then((post)=>{
            return User.findById(req.user._id);
        })
        .then((user)=>{
            user.posts.unshift(post);
            user.save();
            res.redirect('/posts/' + post._id)
        })
        .catch((err)=>{
            console.log(err.message);
        });
        // console.log(req.body);
        // Post.create(req.body).then((post)=>{
        //     console.log(post);
        //     res.redirect('/');
        // }).catch((err)=>{
        //     console.log(err.message);
        // })
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
