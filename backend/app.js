require('dotenv').config();
const express = require('express');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const pointsRoute = require('./routes/points');
const profileRoute = require('./routes/profile');

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/points', pointsRoute);
app.use('/profile', profileRoute);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
