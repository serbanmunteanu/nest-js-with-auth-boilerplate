import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactMessageDto } from 'src/api/contact/dto/create-message.dto';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) {}

  async store(contact: CreateContactMessageDto): Promise<Contact> {
    return await this.repo.save(contact);
  }
}
