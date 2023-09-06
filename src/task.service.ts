// task.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.model';
import { Readable } from 'stream';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  streamTasks(): Observable<Task> {
    const stream = new Readable({ objectMode: true });

    this.taskModel
      .find()
      .limit(10)
      .cursor()
      .eachAsync((doc: Task) => {
        stream.push(doc);
      });

    stream.push(null); // Mark the end of the stream
    return new Observable((observer) => {
      stream.on('data', (data) => observer.next(data));
      stream.on('end', () => observer.complete());
      stream.on('error', (error) => observer.error(error));
    });
  }
}
