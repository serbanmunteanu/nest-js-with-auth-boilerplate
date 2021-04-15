import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail-queue') private mailQueue: Queue) {}

  async sendConfirmationEmail(
    email: string,
    nume: string,
    code: string,
  ): Promise<boolean> {
    try {
      await this.mailQueue.add('confirmation', {
        email,
        nume,
        code,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
