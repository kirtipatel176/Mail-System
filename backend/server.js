const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 8000;

// Create transporter (using Gmail SMTP as example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your mail',        // Replace
        pass: 'yourpassword',           // Use App Password (not your actual password)
    },
});

app.post('/api/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: email,
            to: 'YOUR_EMAIL@gmail.com',        // Where you want to receive messages
            subject: `Contact Form: ${name}`,
            text: message,
        });

        res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
