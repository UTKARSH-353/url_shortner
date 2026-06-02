const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true, trim: true },
    shortCode: { type: String, required: true, unique: true, index: true },
    customAlias: { type: String, unique: true, sparse: true, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    clicks: { type: Number, default: 0 },
    qrCode: { type: String },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

urlSchema.virtual('isExpired').get(function () {
  return this.expiresAt && this.expiresAt < new Date();
});

module.exports = mongoose.model('Url', urlSchema);
