const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

// подключаем папку public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>BMI Calculator</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          <h2>BMI Calculator</h2>
          <form method="POST" action="/calculate-bmi">
            <input type="number" step="0.01" name="weight" placeholder="Weight (kg)" required>
            <input type="number" step="0.01" name="height" placeholder="Height (m)" required>
            <button type="submit">Calculate</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (weight <= 0 || height <= 0) {
    return res.send('Invalid input');
  }

  const bmi = weight / (height * height);
  let category = '';
  let className = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    className = 'underweight';
  } else if (bmi < 24.9) {
    category = 'Normal';
    className = 'normal';
  } else if (bmi < 29.9) {
    category = 'Overweight';
    className = 'overweight';
  } else {
    category = 'Obese';
    className = 'obese';
  }

  res.send(`
    <html>
      <head>
        <title>BMI Result</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          <h2>Your BMI</h2>
          <div class="result ${className}">
            ${bmi.toFixed(2)} — ${category}
          </div>
          <a href="/">Back</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});