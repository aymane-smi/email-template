import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { EmailServiceImpl } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { SendEmailDTO } from './dto/sendMail.dto';
import { Response } from 'express';

@Controller('/api/email-template')
export class EmailController {
  constructor(private readonly emailService: EmailServiceImpl) {}

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Get()
  findAll() {
    return this.emailService.findAll();
  }

  @Post("send")
  sendMail(@Body() sendMailDTO: SendEmailDTO){
    return this.emailService.sendEmail(sendMailDTO.id, sendMailDTO.to);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(id);
  }

  @Get("download/:id")
  async download(@Param("id") id: string, @Res() res: Response){
    res.setHeader('Content-Type', 'message/rfc822');
    res.setHeader('Content-Disposition', `attachment; filename="email.eml"`);
    res.send(await this.emailService.downloadEmail(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(id, updateEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailService.remove(id);
  }
}
