import {
  Processor,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
} from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('mail-queue')
export class MailProcessor {
  constructor(private mailerService: MailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.debug(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    console.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    console.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('confirmation')
  async sendWelcomeEmail(
    job: Job<{ email: string; nume: string; code: string }>,
  ): Promise<any> {
    console.log(`Sending confirmation email to '${job.data.email}'`);

    try {
      const result = await this.mailerService.sendMail({
        template: 'confirmation',
        context: {
          nume: 'bine-bai',
          url: 'asdsadsa',
        },
        subject: `Welcome to Please Confirm Your Email Address`,
        to: job.data.email,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Process('contact-message-confirmation')
  async sendContactConfirmationEmail(
    job: Job<{ email: string; name: string }>,
  ): Promise<any> {
    try {
      const result = await this.mailerService.sendMail({
        template: 'contactMessageConfirmation',
        context: {
          name: job.data.name,
        },
        subject: `We receive your request and we will come later`,
        to: job.data.email,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}
