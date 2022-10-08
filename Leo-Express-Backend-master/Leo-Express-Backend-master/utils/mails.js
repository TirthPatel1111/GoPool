const nodemailer = require("nodemailer");
const {
    host,
    port,
    senderEmail,
    username,
    password,
} = require("../config/mail.config");

const sendMail = async (receiverEmail, subject, data, dataHTML) => {
    let transporter = nodemailer.createTransport({
        host,
        port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: username,
            pass: password,
        },
    });

    let info = await transporter.sendMail({
        from: senderEmail,
        to: receiverEmail,
        subject: subject,
        text: data,
        html: dataHTML,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendMail;
