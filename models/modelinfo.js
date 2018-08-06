const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ModelinfoSchema = new Schema({
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  gender:    { type: String, required: true },
  race:      { type: String, required: true },
  bio:       { type: String, required: true },
  dob:       { type: Date,   required: true },
  age:       { type: Number, required: true },
  street:    { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: false },
  country:   { type: String, required: true },
  zip:       { type: Number, required: false },
  phone:     { type: Number, required: false },
  height:    { type: Number, required: false },
  waist:     { type: Number, required: false },
  eye:       { type: String, required: false },
  hair:      { type: String, required: false },
  bust:      { type: Number, required: false },
  full:      { type: String, required: false },
  waistup:   { type: String, required: false },
  closeup:   { type: String, required: false },
  profile:   { type: String, required: false },
  cover:     { type: String, required: false },
  pic1:      { type: String, required: false },
  pic2:      { type: String, required: false },
  pic3:      { type: String, required: false },
  pic4:      { type: String, required: false },
});

ModelinfoSchema.pre('save', function(next) {
  let userz = this;
  bcrypt.hash(userz.password, 10, function (err, hash){
    if (err) return next(err);

    userz.password = hash;
    next();
  })
});

ModelinfoSchema.statics.authenticate = function(email, password, next) {
    console.log(email);
    console.log(password);
  Modelinfo.findOne({ email: email })
    .exec(function (err, userz) {
      if (err) {
        return next(err)
      } else if (!userz) {
          console.log(email);
        var err = new Error('User not found.');
        err.status = 401;
        return next(err);
      }
      bcrypt.compare(password, userz.password, function (err, result) {
        if (result === true) {
          return next(null, userz);
        } else {
            console.log(password)
            console.log(userz.password)
          return next();
        }
      });
    });
}


const Modelinfo = mongoose.model('Modelinfo', ModelinfoSchema);
module.exports = Modelinfo;
