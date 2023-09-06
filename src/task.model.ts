// task.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'contacts' })
export class Task extends Document {
  @Prop()
  name: string;

  @Prop()
  uuid: string;

  @Prop()
  app: string;

  @Prop()
  typeEntity: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
