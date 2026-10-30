const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const blogs = [];

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email))
    return res.status(400).json({ message: 'Email already registered' });
  users.push({ name, email, password });
  res.json({ message: 'Registered successfully' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ message: 'Login successful', name: user.name });
});

app.post('/blog', (req, res) => {
  const { title, content } = req.body;
  blogs.push({ title, content });
  res.json({ message: 'Blog created', blogs });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));