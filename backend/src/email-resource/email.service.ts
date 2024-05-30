import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Email } from 'src/Schemas/Email';
import { Model } from 'mongoose';

@Injectable()
export class EmailService {
  public constructor(@InjectModel(Email.name)private readonly emailModel: Model<Email>){}
  async create(createEmailDto: CreateEmailDto) {
    let result = await this.emailModel.create({
      ...createEmailDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return result;
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
