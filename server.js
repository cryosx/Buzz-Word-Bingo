const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

let buzzwords = [];

app.use(express.static('public'));

app.post('/buzzword', (req, res) => {
  console.log('test');
  res.send('test');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
