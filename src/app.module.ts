// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { EntryController } from './entry.controller';

@Module({
  imports: [
    MongooseModule.forRoot('URL_DB'),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController, EntryController],
  providers: [TaskService],
})
export class AppModule {}
