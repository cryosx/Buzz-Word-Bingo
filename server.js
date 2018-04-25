const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

let buzzwords = {};

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/buzzwords', (req, res) => {
  res.json(buzzwords);
});
app.post('/buzzwords', (req, res) => {
  if (!req.body.buzzWord || !req.body.points) {
    res.json({ success: false });
  } else if (
    typeof req.body.buzzWord !== 'string' ||
    Number.isNaN(Number.parseInt(req.body.points)) ||
    typeof Number.parseInt(req.body.points) !== 'number'
  ) {
    res.json({ success: false });
  } else if (buzzwords[`${req.body.buzzWord}`]) {
    res.json({ success: false });
  } else {
    buzzwords[`${req.body.buzzWord}`] = Number.parseInt(req.body.points);
    res.json({ success: true });
  }
});
app.put('/buzzwords', (req, res) => {});
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
