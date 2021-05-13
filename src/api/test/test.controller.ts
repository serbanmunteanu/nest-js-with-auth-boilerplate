import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthInterceptor } from 'src/common/auth/auth.interceptor';
import { ADMIN_PERMISSION } from 'src/common/constants';
import { CreateSubmissionDto } from './dto/create-submissions.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { GetTestDto } from './dto/get-test.dto';
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

  @Post('/test')
  // @UseInterceptors(AuthInterceptor)
  // @SetMetadata('permission', ADMIN_PERMISSION)
  async store(@Body() dto: CreateTestDto): Promise<GetTestDto> {
    const test = await this.testFacade.createTest(dto);
    return new GetTestDto(test);
  }
}
