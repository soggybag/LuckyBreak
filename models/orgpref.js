const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 

const OrgprefSchema = new Schema({
  height:    { type: String, required: false },
  waist:     { type: String, required: false },
  eye:       { type: String, required: false },
  hair:      { type: String, required: false },
  bust:      { type: String, required: false },
  logo:      { type: Buffer, required: false },
});


const Orgpref = mongoose.model('Orgpref', OrgprefSchema);
module.exports = Orgpref;