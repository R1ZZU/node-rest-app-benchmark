const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/items', (req, res) => {
    if (req.query.stream) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Res-Type', 'stream');

        fs.createReadStream('./data.json')
            .pipe(res);

        return;
    }

    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status = 500;
            res.end();
            return;
        }

        const json = JSON.parse(data);
        res.json(json);
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));