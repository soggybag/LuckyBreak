const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 

const UserSchema = new Schema({
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  gender:    { type: String, required: true },
  dob:       { type: Date,   required: true },
  age:       { type: Number, required: true},
  street:    { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: false },
  country:   { type: String, required: true },
  zip:       { type: Number, required: false },
  phone:     { type: Number, required: false },
  height:    { type: Number, required: true },
  race:      { type: String, required: false },
  hair:      { type: String, required: false },
  eye:       { type: String, required: false },
  waist:     { type: Number, required: false },
  bust:      { type: Number, required: false },
  weight:    { type: Number, required: false },
  bio:       { type: String, required: false },
  full:      { type: Buffer, required: false },
  waistup:   { type: Buffer, required: false },
  closeup:   { type: Buffer, required: false },
  profile:   { type: Buffer, required: false },
  cover:     { type: Buffer, required: false },
  pic1:      { type: Buffer, required: false },
  pic2:      { type: Buffer, required: false },
  pic3:      { type: Buffer, required: false },
  pic4:      { type: Buffer, required: false },
});

UserSchema.pre('save', function(next) {
  let user = this;

  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) return next(err);

    user.password = hash;
    next();
  })
});

UserSchema.statics.authenticate = function(username, password, next) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return next(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return next(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return next(null, user);
        } else {
          return next();
        }
      });
    });
}


const User = mongoose.model('User', UserSchema);
module.exports = User;