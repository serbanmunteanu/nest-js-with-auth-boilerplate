import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
}
