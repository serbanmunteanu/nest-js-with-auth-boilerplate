import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsArray } from 'class-validator';
import { TestAnswersDto } from 'src/common/test/dtos/test-answers.dto';

export class CreateSubmissionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ type: [TestAnswersDto] })
  @IsArray()
  @IsNotEmpty()
  submissions: TestAnswersDto[];
}
