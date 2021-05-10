import { ApiProperty } from '@nestjs/swagger';

export class TestSubmissionPartialDto {
  @ApiProperty()
  grade: number;

  constructor(grade: number) {
    this.grade = grade;
  }
}
