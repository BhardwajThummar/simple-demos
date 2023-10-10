const dotenv = require('dotenv');
const express = require('express');
const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'bhardwajthumber@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

// lets make a rest api for this email service

app.post('/sendEmail', async (req, res) => {
    try {
        console.log(req.body)
        const { html, receiver, subject } = req.body;
        let email = await transporter.sendMail({
            from: 'bhardwajthumber@gmail.com', // sender address
            to: receiver, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        })

        console.log("Message sent: %s", email.messageId);

        res.status(200).json({
            message: "Email sent successfully",
        });
    } catch (e) {
        console.log("error :>>", e);
        res.status(500).json(e);
    }
})

app.listen(port, () => console.log(`Rest API is available on port ${port}!`));