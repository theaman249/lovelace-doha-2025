const express = require('express');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

const app = express();
const PORT = 3000;

app.use('/login', loginRoute);
app.use('/register', registerRoute);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
