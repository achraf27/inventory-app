const express = require('express');
const app = express();
const PORT = 3001; 


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);

  if (username === "test" && password === "123") {
    return res.status(201).json({ message: "Login successful", user: { username } });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});



module.exports = app