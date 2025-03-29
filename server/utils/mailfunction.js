const nodemailer = require("nodemailer")


const sendMail = async (email, emailSubject, content) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: emailSubject,
            html: content
        }

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail sent Successsfully", info.response);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = sendMail;