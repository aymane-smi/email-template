import { Injectable } from '@nestjs/common';
import {createTransport} from "nodemailer";
import { Email } from 'src/Schemas/Email';

@Injectable()
export class MailerService {
    private transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    async sendEmail(template: Email, to: string){
        let result = await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: template.title,
            html: template.template
        });
        return result;
    }
}
