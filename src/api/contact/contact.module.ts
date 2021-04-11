import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactFacade } from './contact.facade';
import { ContactModule as CommonContactModule } from '../../common/contact/contact.module';

@Module({
  imports: [CommonContactModule],
  controllers: [ContactController],
  providers: [ContactFacade],
  exports: [ContactFacade],
})
export class ContactModule {}
