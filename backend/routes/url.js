const router = require('express').Router();
const ctrl = require('../controllers/urlController');
const auth = require('../middleware/auth');
const { shortenLimiter } = require('../middleware/rateLimiter');
const { createUrlRules, updateUrlRules } = require('../validators/urlValidator');
const handle = require('../validators/handleValidation');

router.post('/shorten', auth, shortenLimiter, createUrlRules, handle, ctrl.shorten);
router.get('/user/all', auth, ctrl.listUserUrls);
router.get('/:shortCode', auth, ctrl.getOne);
router.put('/:id', auth, updateUrlRules, handle, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
