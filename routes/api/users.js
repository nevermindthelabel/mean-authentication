require('dotenv').config();
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const secret = process.env.jwtSecret;

router.get('/', auth, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/', async (req, res) => {
  const users = await User.find()
    .select('-password')
    .select('-email');
  res.json(users);
});

router.post(
  '/',
  [
    check('username', 'Username is a required field')
      .not()
      .isEmpty(),
    check('email', 'Email is a required field').isEmail(),
    check(
      'password',
      'Please enter a password with at least 8 characters'
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ username });
      let userEmail = await User.findOne({ email });

      if (user || userEmail) {
        return res.status(400).send('user exists');
      }

      let newUser = new User({
        username,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      const payload = {
        newUser: {
          id: newUser.id
        }
      };

      jwt.sign(payload, secret, { expiresIn: 1800000 }, (err, token) => {
        if (err) throw err;

        res.json({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }
);

module.exports = router;
