const User = require("../models/user");

module.exports = (app) => {

    app.get("/sign-up", (req, res) => {
        res.render("sign-up");
    });

    app.post('/sign-up', (req, res)=>{
        const user = new User(req.body);
        user.save()
        .then((user)=>{
            res.redirect("/");
        })
        .catch((err)=>{
            console.log(err.message);
        });
    });

}
