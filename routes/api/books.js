const router = require('express').Router();
const Book = require('../../models/Book');

router.get('/', (req, res) => {
  res.status(200).send('books, yall');
});

module.exports = router;
