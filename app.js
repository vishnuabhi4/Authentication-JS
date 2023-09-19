const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'your-secret-key'; // Replace with your actual secret key

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json());

// Simulated user database
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
  },
];

// Endpoint for user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulated user authentication logic
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  // If authentication is successful, create a JWT token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

// Protected endpoint
app.get('/protected', (req, res) => {
  // Check if a valid JWT token is provided in the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the JWT token
    jwt.verify(token, secretKey);
    res.json({ message: 'Access granted' });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
