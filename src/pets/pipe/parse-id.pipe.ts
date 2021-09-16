import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseIDPipe implements PipeTransform<string, Types.ObjectId> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
    try {
      const id = new Types.ObjectId(value);
      return id;
    } catch (err) {
      throw new BadRequestException(
        'Validation failed: invalid ID',
        err.message,
      );
    }
  }
}
