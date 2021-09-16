import { ApiProperty } from '@nestjs/swagger';

export class ModifResDto {
  @ApiProperty({ required: true })
  acknowledged: boolean;

  @ApiProperty({
    description: 'Number of updated pets',
    required: true,
  })
  modifiedCount: number;

  @ApiProperty({ required: true })
  upsertedId: any;

  @ApiProperty({ required: true })
  upsertedCount: number;

  @ApiProperty({ required: true })
  matchedCount: number;
}
