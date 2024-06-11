import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Max,
  Min,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Categorization } from '../../categorization/entities/categorization.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Priority must be at least 0' })
  @Max(1000, { message: 'Priority must be at most 3' })
  priority: number;

  user: User;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  completionStatus: boolean;

  @IsArray()
  listCategorization: number[];

  categorizations: Categorization[];
}
