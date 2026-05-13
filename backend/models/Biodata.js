const mongoose = require('mongoose');

const BiodataSchema = new mongoose.Schema({
  title: { type: String, default: 'அம்மாளாச்சி திருமண சேவை' },
  name: { type: String },
  age: { type: String },
  height: { type: String },
  education: { type: String },
  job: { type: String },
  salary: { type: String },
  rasi: { type: String },
  nakshatra: { type: String },
  place: { type: String },
  preference: { type: String },
  contact: { type: String },
  profileImage: { type: String },
  horoscopeImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Biodata', BiodataSchema);
