import { ApiProperty } from '@nestjs/swagger';

export class TestAnswersDto {
  @ApiProperty()
  questionId: number;

  @ApiProperty()
  answerId: number;
}
