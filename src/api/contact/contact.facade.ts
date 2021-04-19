import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactService } from 'src/common/contact/contact.service';
import { MailService } from 'src/common/mail/mail.service';
import { CreateContactMessageDto } from './dto/create-message.dto';

@Injectable()
export class ContactFacade {
  constructor(
    private contactService: ContactService,
    private mailService: MailService,
  ) {}

  async sendMessage(dto: CreateContactMessageDto): Promise<void> {
    try {
      await this.contactService.store(dto);
      await this.mailService.sendContactMessageConfirmation(
        dto.email,
        dto.name,
      );
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
