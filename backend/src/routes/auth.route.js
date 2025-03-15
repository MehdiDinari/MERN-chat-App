import express from 'express';
import { signup } from '../controllers/auth.controllers.js';

const router = express.Router();

// POST routes
router.post("/signup", signup);

// GET routes for now (will be changed to POST later)
router.get("/login", (req, res) => {
  res.send("login route");
});

router.get("/logout", (req, res) => {
  res.send("logout route");
});

// Add a test route
router.get("/signup", (req, res) => {
  res.send(`
    <h1>Signup Test Page</h1>
    <p>This is a GET request. To test the signup functionality, use POST with JSON body.</p>
    <form id="signupForm">
      <div>
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value="Test User">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="test@example.com">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" value="password123">
      </div>
      <button type="submit">Test Signup</button>
    </form>
    
    <div id="result"></div>
    
    <script>
      document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fullName, email, password })
        })
        .then(response => response.json())
        .then(data => {
          document.getElementById('result').innerHTML = 
            '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => {
          document.getElementById('result').innerHTML = 
            '<p style="color:red">Error: ' + error + '</p>';
        });
      });
    </script>
  `);
});

export default router;