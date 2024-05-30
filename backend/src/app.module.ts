import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email-resource/email.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27107/emailTemplate"),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
