import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactService } from 'src/common/contact/contact.service';
import { CreateContactMessageDto } from './dto/create-message.dto';

@Injectable()
export class ContactFacade {
  constructor(private contactService: ContactService) {}

  async sendMessage(dto: CreateContactMessageDto): Promise<void> {
    try {
      await this.contactService.store(dto);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
