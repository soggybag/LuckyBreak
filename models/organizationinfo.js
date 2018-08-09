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
    height:    { type: String, required: false },
    waist:     { type: String, required: false },
    eye:       { type: String, required: false },
    hair:      { type: String, required: false },
    bust:      { type: String, required: false },
    logo:      { type: String, required: false },
});

//OrginfoSchema.pre('save', function(next) {
//  let agencyuser = this;
//
//  bcrypt.hash(agencyuser.password, 10, function (err, hash){
//    if (err) return next(err);
//
//    agencyuser.password = hash;
//    next();
//  })
//});

//OrginfoSchema.pre('save', function(next) {
//  // SET createdAt AND updatedAt
//
//  // ENCRYPT PASSWORD
//  const user = this;
//  if (!user.isModified('password')) {
//    return next();
//  }
//  bcrypt.genSalt(10, (err, salt) => {
//    bcrypt.hash(user.password, salt, (err, hash) => {
//      user.password = hash;
//      next();
//    });
//  });
//});
//
//OrginfoSchema.methods.comparePassword = (password, done) => {
//  bcrypt.compare(password, this.password, (err, isMatch) => {
//    done(err, isMatch);
//  });
//};

//OrginfoSchema.statics.authenticate = function(email, password, next){
//    console.log("Authenticating")
//  Orginfo.findOne({ email: email })
//    .exec(function (err, agencyuser) {
//      console.log("User found?", agencyuser)
//      if (err) {
//        return next(err)
//      } else if (!agencyuser) {
//        var err = new Error('User not found.');
//        err.status = 401;
//        return next(err);
//      }
//      bcrypt.compare(password, agencyuser.password, function (err, result) {
//        if (result === true) {
//          return next(null, agencyuser);
//        } else {
//          return next();
//        }
//      });
//    });
//}

//authenticate the user login credentials
//OrginfoSchema.statics.authenticate = function(email, password, callback) {
//    console.log(password)
//  Orginfo.findOne({email: email})
//    .exec(function(error, user) {
//      if (error) {
//        return callback(error);
//      } else if (!user){
//        //if db is queried and no match found alert the user
//        const err = new Error('User not found.');
//        err.status = 401;
//        return callback(err);
//      }
//      // compare the provided password to the queried user's hash from their db document
//      bcrypt.compare(password, user.password, function(result, error) {
//        if (result === true) {
//          //if match, return null in place of error and supply the user's info from the db
//          return callback(null, user);
//        } else {
//          return callback();
//        }
//      });
//    });
//
//};

////hash the password before sending it to the db
//OrginfoSchema.pre('save', function(next) {
//  const user = this;
//  bcrypt.hash(user.password, 10, function(err, hash){ //define what to hash, how many times to hash it
//     if (err) {
//       return next(err);
//     }
//     user.password = hash; //overwrite the plain text password with the hashed version
//     next();
//  });
//});


const Orginfo = mongoose.model('Orginfo', OrginfoSchema);
module.exports = Orginfo;
