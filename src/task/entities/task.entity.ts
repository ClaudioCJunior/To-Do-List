import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Priority } from '../enums/priority.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop()
  userId: string;

  @Prop({ type: Number, enum: Priority, default: Priority.Low})
  priority: number;

  @Prop({ type: Date })
  dueDate: Date;
 
  @Prop({ type: Boolean, default: false})
  completionStatus: boolean;

  @Prop({ type: Number, default: 1})
  evaluationPoints: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
