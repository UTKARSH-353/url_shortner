const router = require('express').Router();
const ctrl = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

router.get('/user/dashboard', auth, ctrl.userDashboard);
router.get('/:shortCode', auth, ctrl.forShortCode);

module.exports = router;
