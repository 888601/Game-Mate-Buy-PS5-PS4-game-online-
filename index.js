var http = require('http');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const StringBuilder = require('string-builder');

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for setting CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// Route for handling GET requests
app.get('/', (req, res) => {
    fs.readFile('./public/homepage.html', (err, data) => {
        if (err) {
            res.status(500).send('Error loading homepage.html');
        } else {
            res.status(200).type('text/html').send(data);
        }
    });
});



// Route for handling POST requests
app.post('/', (req, res) => {
    let data = new StringBuilder();
    req.on('data', chunk => {
        data.append(chunk);
    });
    req.on('end', () => {
        // Here you can process the received data
        console.log('Received data:', data.toString());
        let response = new StringBuilder();
        response.append('POST request received\n');
        response.append('Path: /').append('\n');
        response.append('Data: ').append(data.toString()).append('\n');
        res.status(200).type('text/plain').send(response.toString());
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
