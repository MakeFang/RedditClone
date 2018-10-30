const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server.js');
const Post = require('../models/post.js')

chai.use(chaiHttp);

const fakePost = {
    title: "Fake Title",
    url: "https://fakeurl.com",
    summary: "Fake Summary"
}

describe('site', ()=>{

    it('Should have home page', (done)=>{
        chai.request('localhost:5000')
        .get('/')
        .end((err,res)=>{
            if (err) {
                done(err)
            }
            res.status.should.be.equal(200);
            res.should.be.html;
            done()
        })
    })

})

describe('Posts', ()=>{

    after(()=>{
        Post.deleteMany({url: "https://fakeurl.com"}).exec((err,posts)=>{
            console.log(posts);
            posts.remove();
        })
    })

    it('should create with valid attributes at POST /posts', (done)=>{
        chai.request(server)
        .post('/posts')
        .send(fakePost)
        .end((err,res)=>{
            if (err){
                done(err);
            }
            res.should.have.status(200);
            done();
        })

        // How many posts are there now?
        // Make a request to create another
        // Check that the database has one more post in it
        // Check that the response is a successful
    })

})
