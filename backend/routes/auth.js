const router = require('express').Router();
const ctrl = require('../controllers/authController');
const auth = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { registerRules, loginRules } = require('../validators/authValidator');
const handle = require('../validators/handleValidation');

router.post('/register', authLimiter, registerRules, handle, ctrl.register);
router.post('/login', authLimiter, loginRules, handle, ctrl.login);
router.get('/profile', auth, ctrl.profile);

module.exports = router;
