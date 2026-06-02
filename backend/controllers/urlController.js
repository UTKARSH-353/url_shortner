const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const Analytics = require('../models/Analytics');
const generateQR = require('../utils/qrGenerator');
const { recordClick } = require('../services/analyticsService');

exports.shorten = async (req, res, next) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const base = process.env.BASE_URL;

    let shortCode = customAlias?.trim();
    if (shortCode) {
      const taken = await Url.findOne({ $or: [{ shortCode }, { customAlias: shortCode }] });
      if (taken) return res.status(409).json({ message: 'Alias already taken' });
    } else {
      do { shortCode = nanoid(7); } while (await Url.findOne({ shortCode }));
    }

    const shortUrl = `${base}/${shortCode}`;
    const qrCode = await generateQR(shortUrl);

    const doc = await Url.create({
      originalUrl,
      shortCode,
      customAlias: customAlias || undefined,
      userId: req.user._id,
      qrCode,
      expiresAt: expiresAt || null,
    });

    res.status(201).json({ ...doc.toObject(), shortUrl });
  } catch (err) { next(err); }
};

exports.listUserUrls = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const search = (req.query.search || '').trim();
    const sort = req.query.sort || '-createdAt';

    const filter = { userId: req.user._id };
    if (search) {
      filter.$or = [
        { originalUrl: { $regex: search, $options: 'i' } },
        { shortCode: { $regex: search, $options: 'i' } },
        { customAlias: { $regex: search, $options: 'i' } },
      ];
    }

    const [items, total] = await Promise.all([
      Url.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
      Url.countDocuments(filter),
    ]);

    const base = process.env.BASE_URL;
    res.json({
      items: items.map((u) => ({ ...u.toObject(), shortUrl: `${base}/${u.shortCode}` })),
      page, limit, total, pages: Math.ceil(total / limit),
    });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode, userId: req.user._id });
    if (!url) return res.status(404).json({ message: 'Not found' });
    res.json({ ...url.toObject(), shortUrl: `${process.env.BASE_URL}/${url.shortCode}` });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const url = await Url.findOne({ _id: req.params.id, userId: req.user._id });
    if (!url) return res.status(404).json({ message: 'Not found' });

    if (customAlias && customAlias !== url.customAlias) {
      const taken = await Url.findOne({
        _id: { $ne: url._id },
        $or: [{ shortCode: customAlias }, { customAlias }],
      });
      if (taken) return res.status(409).json({ message: 'Alias already taken' });
      url.customAlias = customAlias;
      url.shortCode = customAlias;
    }
    if (originalUrl) url.originalUrl = originalUrl;
    if (expiresAt !== undefined) url.expiresAt = expiresAt || null;

    await url.save();
    res.json(url);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const url = await Url.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!url) return res.status(404).json({ message: 'Not found' });
    await Analytics.deleteMany({ urlId: url._id });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

exports.redirect = async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).send('Short URL not found');
    if (url.expiresAt && url.expiresAt < new Date())
      return res.status(410).send('This link has expired');

    url.clicks += 1;
    await url.save();
    recordClick(url._id, req); // fire & forget
    return res.redirect(url.originalUrl);
  } catch (err) { next(err); }
};
