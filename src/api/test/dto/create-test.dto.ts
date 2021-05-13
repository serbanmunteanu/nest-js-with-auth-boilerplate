import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AnswerDto } from 'src/common/test/dtos/answer.dto';

export class CreateTestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ type: [AnswerDto] })
  @IsNotEmpty()
  @IsArray()
  answers: AnswerDto[];
}
