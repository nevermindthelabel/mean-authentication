require('dotenv').config();
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const User = require('../../models/User');
const secret = process.env.jwtSecret;

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
    console.log('here')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      console.log('there')
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      console.log('test')
      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      console.log('salting')
      user.password = await bcrypt.hash(password, salt);
      console.log('salted')
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, secret, { expiresIn: 1800000 }, (err, token) => {
        if (err) throw err;

        res.json({ token });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
