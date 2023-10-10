const express = require('express');
const multer = require('multer')
const app = express();
const port = 3000;

const upload = multer({ dest: './uploads/' })

app.post('/fileUpload', upload.single('file'), function (req, res) {
    try {
        res.status(200).json({
            message: "success"
        })
    } catch (e) {
        console.log("error :>>", e);
        res.status(500).json(e);
    }
});

app.listen(port, () => console.log(`Multer app listening on port ${port}!`));