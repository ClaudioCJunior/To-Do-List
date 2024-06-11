import { FilterTaskDto } from './filter-task.dto';
import { SortTaskDto } from './sort-task.dto';

export class ListTaskDto {
  filter: FilterTaskDto;
  sort: SortTaskDto;
}
