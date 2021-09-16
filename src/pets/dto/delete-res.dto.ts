import { ApiProperty } from '@nestjs/swagger';

export class DeleteResDto {
  @ApiProperty({
    description: 'Number of deleted pets',
    required: true,
  })
  deletedCount: number;
}
