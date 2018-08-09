const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const ModelpicturesSchema = new Schema({
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


const Modelpics = mongoose.model('Modelpics', ModelpicturesSchema);
module.exports = Modelpics;