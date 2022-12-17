const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'The password must be more than four and less than ten characters.').isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;
