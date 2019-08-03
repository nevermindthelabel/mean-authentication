const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Book = require('../../models/Book');

router.get('/', (req, res) => {
  res.status(200).send('books, yall');
});

router.post(
  '/',
  [
    check('isbn', 'isbn is required')
      .not()
      .isEmpty(),
    check('title', 'title is obviously required')
      .not()
      .isEmpty(),
    check('author', 'author is obviously required')
      .not()
      .isEmpty(),
    check('publisher', 'publisher is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { isbn, title, author, publisher } = req.body;

    try {
      let book = await Book.findOne({ isbn });
      if (book) {
        return res.status(400).send('book is in database already');
      }

      let newBook = new Book({
        isbn,
        title,
        author,
        publisher
      });

      await newBook.save();
      res.json({ newBook });
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
