const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'Url', required: true, index: true },
  ipAddress: { type: String },
  country: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' },
  browser: { type: String, default: 'Unknown' },
  os: { type: String, default: 'Unknown' },
  device: { type: String, default: 'Unknown' },
  referrer: { type: String, default: 'Direct' },
  clickedAt: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
