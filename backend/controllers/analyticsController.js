const Url = require('../models/Url');
const Analytics = require('../models/Analytics');

exports.forShortCode = async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode, userId: req.user._id });
    if (!url) return res.status(404).json({ message: 'Not found' });

    const [total, uniqueIps, byDevice, byBrowser, byCountry, byDay, recent] = await Promise.all([
      Analytics.countDocuments({ urlId: url._id }),
      Analytics.distinct('ipAddress', { urlId: url._id }),
      Analytics.aggregate([{ $match: { urlId: url._id } }, { $group: { _id: '$device', value: { $sum: 1 } } }]),
      Analytics.aggregate([{ $match: { urlId: url._id } }, { $group: { _id: '$browser', value: { $sum: 1 } } }]),
      Analytics.aggregate([{ $match: { urlId: url._id } }, { $group: { _id: '$country', value: { $sum: 1 } } }, { $sort: { value: -1 } }, { $limit: 10 }]),
      Analytics.aggregate([
        { $match: { urlId: url._id } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$clickedAt' } }, clicks: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Analytics.find({ urlId: url._id }).sort('-clickedAt').limit(20),
    ]);

    res.json({
      url,
      totalClicks: total,
      uniqueVisitors: uniqueIps.length,
      byDevice, byBrowser, byCountry, byDay, recent,
    });
  } catch (err) { next(err); }
};

exports.userDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const urls = await Url.find({ userId });
    const urlIds = urls.map((u) => u._id);

    const [totalClicks, uniqueIps, byDay, byDevice, byBrowser, byCountry, topUrls, recent] = await Promise.all([
      Analytics.countDocuments({ urlId: { $in: urlIds } }),
      Analytics.distinct('ipAddress', { urlId: { $in: urlIds } }),
      Analytics.aggregate([
        { $match: { urlId: { $in: urlIds } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$clickedAt' } }, clicks: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 30 },
      ]),
      Analytics.aggregate([{ $match: { urlId: { $in: urlIds } } }, { $group: { _id: '$device', value: { $sum: 1 } } }]),
      Analytics.aggregate([{ $match: { urlId: { $in: urlIds } } }, { $group: { _id: '$browser', value: { $sum: 1 } } }]),
      Analytics.aggregate([{ $match: { urlId: { $in: urlIds } } }, { $group: { _id: '$country', value: { $sum: 1 } } }, { $sort: { value: -1 } }, { $limit: 10 }]),
      Url.find({ userId }).sort('-clicks').limit(5),
      Analytics.find({ urlId: { $in: urlIds } }).sort('-clickedAt').limit(15).populate('urlId', 'shortCode originalUrl'),
    ]);

    res.json({
      totalUrls: urls.length,
      totalClicks,
      uniqueVisitors: uniqueIps.length,
      topUrls, byDay, byDevice, byBrowser, byCountry, recent,
    });
  } catch (err) { next(err); }
};
