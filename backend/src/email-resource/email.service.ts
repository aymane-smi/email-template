import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Email } from 'src/Schemas/Email';
import { Model } from 'mongoose';
import { EmailService } from './email-service.interface';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class EmailServiceImpl implements EmailService{
  public constructor(@InjectModel(Email.name)private readonly emailModel: Model<Email>, private mailerService: MailerService){}
  async create(createEmailDto: CreateEmailDto) {
    let result = await this.emailModel.create({
      ...createEmailDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return result;
  }

  async findAll() {
    return await this.emailModel.find();
  }

  async findOne(id: string) {
    return await this.emailModel.findById(id);
  }

  async update(id: string, updateEmailDto: UpdateEmailDto) {
    await this.emailModel.findByIdAndUpdate(id, updateEmailDto);
    return "email template update";
  }

  async remove(id: string) {
    return await this.emailModel.findByIdAndDelete(id);
  }

  async sendEmail(id: string, to: string) {
    let template = await this.emailModel.findById(id);
    return await this.mailerService.sendEmail(template, to); 
  }

  async downloadEmail(id: string) {
    let template = await this.emailModel.findById(id);
    return `MIME-Version: 1.0
    Content-Type: multipart/alternative; boundary="boundary123"

    --boundary123
    Content-Type: text/plain; charset=UTF-8

    This is the plain text version of the email.

    --boundary123
    Content-Type: text/html; charset=UTF-8
    Content-Transfer-Encoding: quoted-printable

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${template.title}</title>
    </head>
    <body>
      ${template.template}
    </body>
    </html>

    --boundary123--
  `;
  }
}
