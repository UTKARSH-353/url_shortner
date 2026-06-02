const QRCode = require('qrcode');
module.exports = async (text) => {
  try { return await QRCode.toDataURL(text, { width: 300, margin: 2 }); }
  catch { return null; }
};
