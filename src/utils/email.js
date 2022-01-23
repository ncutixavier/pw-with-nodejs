const nodemailer = require('nodemailer')

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        service: 'gmail',
        auth: {
            // user: process.env.EMAIL_USER,
            // pass: process.env.EMAIL_PASS
            user: 'ncuti70@gmail.com',
            pass: 'ndagijimana70'
        }
    })

    const mailOptions = {
        from: 'hello@ncutixavier.com',
        to: '<ncuti70@gmail.com>',
        subject: 'Message from your portifolio website',
        text: `${options.name}\n\n${options.email}\n\n${options.message}`
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail