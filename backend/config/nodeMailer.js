const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    },
    connectionTimeout: 10000,
    socketTimeout: 10000
})

module.exports = transporter;