import { CreateEmailDto } from "./dto/create-email.dto";
import { UpdateEmailDto } from "./dto/update-email.dto";

export interface EmailService {
    create(createEmailDto: CreateEmailDto);
    findAll();
    findOne(id: string);
    update(id: string, updateEmailDto: UpdateEmailDto);
    remove(id: string);
    sendEmail(id: string, to: string);
    downloadEmail(id: string);
}
