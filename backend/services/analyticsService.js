const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');
const Analytics = require('../models/Analytics');

exports.recordClick = async (urlId, req) => {
  try {
    const ip = requestIp.getClientIp(req) || '';
    const geo = ip ? geoip.lookup(ip) : null;
    const ua = new UAParser(req.headers['user-agent'] || '').getResult();

    await Analytics.create({
      urlId,
      ipAddress: ip,
      country: geo?.country || 'Unknown',
      city: geo?.city || 'Unknown',
      browser: ua.browser.name || 'Unknown',
      os: ua.os.name || 'Unknown',
      device: ua.device.type || 'desktop',
      referrer: req.get('Referer') || 'Direct',
    });
  } catch (err) {
    console.error('Analytics error:', err.message);
  }
};
