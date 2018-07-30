const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 

const ModelinfoSchema = new Schema({
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  gender:    { type: String, required: true },
  dob:       { type: Date,   required: true },
  age:       { type: Number, required: true },
  street:    { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: false },
  country:   { type: String, required: true },
  zip:       { type: Number, required: false },
  phone:     { type: Number, required: false },
});

ModelinfoSchema.pre('save', function(next) {
  let user = this;

  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) return next(err);

    user.password = hash;
    next();
  })
});

ModelinfoSchema.statics.authenticate = function(username, password, next) {
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


const Modelinfo = mongoose.model('Modelinfo', ModelinfoSchema);
module.exports = Modelinfo;