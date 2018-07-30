const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 


const ModelprefSchema = new Schema({
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


const Modelpref = mongoose.model('Modelpref', ModelprefSchema);
module.exports = Modelpref;