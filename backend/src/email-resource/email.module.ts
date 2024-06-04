import { Module } from '@nestjs/common';
import { EmailServiceImpl } from './email.service';
import { EmailController } from './email.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Email, emailSchema } from 'src/Schemas/Email';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  controllers: [EmailController],
  providers: [EmailServiceImpl],
  imports: [MongooseModule.forFeature([{name: Email.name, schema: emailSchema}]), MailerModule]
})
export class EmailModule {}
