const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path'); // Import the path module

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log('Error verifying transporter:', error);
    } else {
        console.log('Server is ready to send emails.');
    }
});

// Endpoint to receive PDF data and send email with attachment
app.post('/send-email', async (req, res) => {
    const { pdfData, to, subject, text } = req.body;

    // Convert base64 PDF data to buffer
    const pdfBuffer = Buffer.from(pdfData.split('data:application/pdf;base64,')[1], 'base64');

    // Setup email data with attachment
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        attachments: [
            {
                filename: 'attachment.pdf',
                content: pdfBuffer,
                encoding: 'base64',
            },
        ],
    };

    // Send email with attachment
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('Error sending email with PDF attachment.');
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully with PDF attachment.' });
        }
    });
});

// Catch-all route to serve your dashboard.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
