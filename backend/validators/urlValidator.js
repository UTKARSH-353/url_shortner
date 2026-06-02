const { body } = require('express-validator');

exports.createUrlRules = [
  body('originalUrl').isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage('Valid URL required'),
  body('customAlias').optional({ checkFalsy: true }).isAlphanumeric().isLength({ min: 3, max: 32 }),
  body('expiresAt').optional({ checkFalsy: true }).isISO8601(),
];

exports.updateUrlRules = [
  body('originalUrl').optional().isURL({ protocols: ['http', 'https'], require_protocol: true }),
  body('customAlias').optional({ checkFalsy: true }).isAlphanumeric().isLength({ min: 3, max: 32 }),
  body('expiresAt').optional({ checkFalsy: true }).isISO8601(),
];
