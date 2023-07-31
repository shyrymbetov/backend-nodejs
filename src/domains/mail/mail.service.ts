import {MailMessageType} from "./types/mail-message.type";
import {config} from "../../config";
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
        user: config.mail.username,
        pass: config.mail.password,
    },
});

export async function sendMailMessage(messageDto: MailMessageType) {
    return await transporter.sendMail({ ...messageDto })
        .then((info) => {
            if (process.env.NODE_ENV === 'local') {
            }
            return info;
        });
}
