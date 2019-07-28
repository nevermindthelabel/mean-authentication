const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hey');
});

app.listen(PORT, () =>
  console.log(
    `🌎  ==> API Server now listening on PORT http://localhost:${PORT}`
  )
);
