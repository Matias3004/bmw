const PORT = 3001;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
dotenv.config({path: './config.env'});

app.get('/', (req, res) => {
    return res.status(200).send("Siemano!");
});

app.use(
    fileUpload({
        useTempFiles: true,
        safeFileNames: true,
        preserveExtension: true,
        tempFileDir: `${__dirname}${process.env.FILES_DIR}/temp`
    })
);

app.post('/upload', (req, res, next) => {
    let uploadFile = req.files.file;
    const name = uploadFile.name;
    uploadFile.mv(`${__dirname}${process.env.FILES_DIR}/${name}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({status: 'uploaded', name});
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});