import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactFacade } from './contact.facade';
import { ContactModule as CommonContactModule } from '../../common/contact/contact.module';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [CommonContactModule, MailModule],
  controllers: [ContactController],
  providers: [ContactFacade],
  exports: [ContactFacade],
})
export class ContactModule {}
