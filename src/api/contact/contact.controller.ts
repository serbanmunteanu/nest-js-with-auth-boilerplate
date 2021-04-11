import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactFacade } from './contact.facade';
import { ContactMessageResponseDto } from './dto/contact-message-response.dto';
import { CreateContactMessageDto } from './dto/create-message.dto';

@ApiTags('Contact')
@Controller('api')
export class ContactController {
  constructor(private contactFacade: ContactFacade) {}

  @Post('/contact')
  @ApiBody({ type: CreateContactMessageDto })
  @ApiResponse({ type: ContactMessageResponseDto })
  @ApiOperation({
    operationId: 'send-message',
    summary: 'Send a direct message without account',
    description: 'Send a direct message without account',
  })
  async directMessage(
    @Body() dto: CreateContactMessageDto,
  ): Promise<ContactMessageResponseDto> {
    await this.contactFacade.sendMessage(dto);
    return new ContactMessageResponseDto(
      'Success',
      'Your message has been sent.',
    );
  }
}
