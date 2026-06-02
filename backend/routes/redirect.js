const router = require('express').Router();
const { redirect } = require('../controllers/urlController');
router.get('/:shortCode', redirect);
module.exports = router;
