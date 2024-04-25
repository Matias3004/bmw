const PORT = 3001;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
dotenv.config({path: './config.env'});

app.get('/', (req, res) => {
    return res.status(200).send("Siemano!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});