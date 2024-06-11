import {
  IsNotEmpty
} from 'class-validator';

export class FilterTaskDto {
  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  value: string;
}
