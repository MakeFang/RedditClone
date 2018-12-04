const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: { type: String, select: false },
    isAdmin: { type: Boolean, default: false },
    posts : [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments : [{ type: Schema.Types.ObjectId, ref: "Comment"}]
},{
    timestamps: true
});

UserSchema.pre("save", function(next){
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
