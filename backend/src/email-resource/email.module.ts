import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Email, emailSchema } from 'src/Schemas/Email';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [MongooseModule.forFeature([{name: Email.name, schema: emailSchema}])]
})
export class EmailModule {}
