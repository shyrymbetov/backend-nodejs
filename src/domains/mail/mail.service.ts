import {MailMessageType} from "./types/mail-message.type";
import nodemailer from 'nodemailer';
import {env} from "../../env";
import {config} from "../../config";

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
