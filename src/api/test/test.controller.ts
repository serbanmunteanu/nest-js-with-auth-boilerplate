import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubmissionDto } from './dto/create-submissions.dto';
import { TestSubmissionPartialDto } from './dto/test-submission-partial.dto';
import { TestFacade } from './test.facade';

@ApiTags('Test')
@Controller('api')
export class TestController {
  constructor(private testFacade: TestFacade) {}

  @Get('/tests')
  async getTests(@Res() response): Promise<void> {
    const tests = await this.testFacade.getTests();
    response.json(tests);
  }

  @Post('/tests')
  async doTest(
    @Body() dto: CreateSubmissionDto,
  ): Promise<TestSubmissionPartialDto> {
    const prospect = await this.testFacade.getResult(dto);
    return new TestSubmissionPartialDto(prospect.grade);
  }
}
