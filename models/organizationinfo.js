const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 

const OrginfoSchema = new Schema({
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  orgtype:   { type: String, required: true },
  name:      { type: String, required: true },
  site:      { type: String, required: true },
  firstname: { type: String, required: false },
  lastname:  { type: String, required: false },
  address:   { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: false },
  country:   { type: String, required: true },
  zip:       { type: Number, required: false },
  phone:     { type: Number, required: true },
});

OrginfoSchema.pre('save', function(next) {
  let agencyuser = this;

  bcrypt.hash(agencyuser.password, 10, function (err, hash){
    if (err) return next(err);

    agencyuser.password = hash;
    next();
  })
});

OrginfoSchema.statics.authenticate = function(email, password, next) {
  Orginfo.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return next(err)
      } else if (!agencyuser) {
        var err = new Error('User not found.');
        err.status = 401;
        return next(err);
      }
      bcrypt.compare(password, agencyuser.password, function (err, result) {
        if (result === true) {
          return next(null, agencyuser);
        } else {
          return next();
        }
      });
    });
}

const Orginfo = mongoose.model('Orginfo', OrginfoSchema);
module.exports = Orginfo;