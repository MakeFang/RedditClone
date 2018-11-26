const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

let agent = chai.request.agent(server);

let User = require('../models/user.js');

describe("User", ()=>{

    it('should not be able to sign in if not registered', (done)=>{
        agent.post("/login", {username: "a@a.com", password: "123"})
        .end((err,res)=>{
            res.status.should.be.equal(401);
            done();
        })
    });

    it('should be able to sign up', (done)=>{
        User.findOneAndRemove({username: "testone"}, ()=>{
            agent
            .post("/sign-up")
            .send({ username: "testone", password: "password" })
            .end((err, res)=>{
                res.should.have.status(200);
                expect(agent).to.have.cookie('nToken');
                done();
            });
        });
    });

    it("should be able to log out", (done)=>{
        agent.get("/logout")
        .end((err, res)=>{
            res.should.have.status(200);
            expect(agent).to.not.have.cookie('nToken');
            done();
        });
    });

    it("should be able to log in", (done)=>{
        agent
        .post("/login")
        .send({ username: "testone", password: "password" })
        .end((err, res)=>{
            res.should.have.status(200);
            expect(agent).to.have.cookie('nToken');
            ;done();
        });
    });

})
