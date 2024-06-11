import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Priority } from '../enums/priority.enum';
import { Categorization } from '../enums/categorization.enum';

export type TaskCategorizationDocument = HydratedDocument<TaskCategorization>;

@Schema()
export class TaskCategorization {
  @Prop({ type: String })
  taskId: string;

  @Prop({ type: Number, enum: Categorization, default: Categorization.Home })
  categorization: number;
}

export const TaskCategorizationSchema =
  SchemaFactory.createForClass(TaskCategorization);
