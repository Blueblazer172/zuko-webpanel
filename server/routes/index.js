const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from Server api Endpoint');
});

router.get('/login', (req, res) => {
    res.send('Hello World, from api login');
});

module.exports = router;
