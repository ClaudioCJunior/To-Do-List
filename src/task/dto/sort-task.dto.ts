import {
  IsNotEmpty
} from 'class-validator';

export class SortTaskDto {
  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  direction: string;
}
