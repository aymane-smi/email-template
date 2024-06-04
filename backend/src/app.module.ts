import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email-resource/email.module';
import {ConfigModule} from "@nestjs/config"
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/emailTemplate?authSource=admin`),
    EmailModule,
    MailerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}