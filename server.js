const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

let buzzWords = {};
let totalScore = 0;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/buzzwords', (req, res) => {
  res.json(buzzWords);
});
app.post('/heard', (req, res) => {
  const buzzWord = req.body.buzzWord;
  if (!buzzWords[buzzWord]) {
    return res.status(400).json({ success: false });
  }
  totalScore += buzzWords[buzzWord];
  return res.status(200).json({ totalScore: totalScore });
});
app.post('/reset', (req, res) => {
  const reset = req.body.reset;

  if (!validateReset(reset)) {
    return res.status(400).json({ success: false });
  }
  buzzWords = {};
  totalScore = 0;
  return res.status(200).json({ success: true });
});
app.post('/buzzwords', (req, res) => {
  const buzzWord = req.body.buzzWord;
  const points = Number.parseInt(req.body.points);

  if (!validatePost(buzzWord, points)) {
    return res.status(400).json({ success: false });
  }
  buzzWords[buzzWord] = points;
  return res.status(200).json({ success: true });
});
app.put('/buzzwords', (req, res) => {
  const buzzWord = req.body.buzzWord;
  const points = Number.parseInt(req.body.points);

  if (!validatePut(buzzWord, points)) {
    return res.status(400).json({ success: false });
  }
  buzzWords[buzzWord] = points;
  return res.status(200).json({ success: true });
});

app.delete('/buzzwords', (req, res) => {
  const buzzWord = req.body.buzzWord;
  if (!buzzWords[buzzWord]) {
    return res.status(400).json({ success: false });
  }
  delete buzzWords[buzzWord];
  return res.status(200).json({ success: true });
});
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

function validateReset(reset) {
  if (!reset) return false;
  if (reset === 'false') return false;
  return true;
}

function validatePost(buzzWord, points) {
  if (!buzzWord) return false;
  if (!points) return false;
  if (typeof buzzWord !== 'string') return false;
  if (Number.isNaN(points)) return false;
  if (typeof points !== 'number') return false;
  if (buzzWords[buzzWord]) return false;
  return true;
}

function validatePut(buzzWord, points) {
  if (!buzzWord) return false;
  if (!points) return false;
  if (typeof buzzWord !== 'string') return false;
  if (Number.isNaN(points)) return false;
  if (typeof points !== 'number') return false;
  if (!buzzWords[buzzWord]) return false;
  return true;
}
