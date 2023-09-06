import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Subject } from 'rxjs';
import { Task } from './task.model';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

@Controller()
export class TaskController {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  @GrpcMethod('TaskService', 'StreamTasks')
  streamTasks(data: any) {
    console.log('GrpcMethod::streamTasks:: ', data);
    const subject = new Subject<Task>();

    // const stream = new Readable({ objectMode: true });
    const cursor = this.taskModel.find().cursor({
      // maxTimeMS: 60200,
      batchSize: 1000,
      // tailable: 1,
    });

    // Register data event listener to send responses to the client
    cursor.on('data', (doc) => {
      subject.next(doc);
      // call.write(doc);
    });

    // Register end event listener to end the gRPC call
    cursor.on('end', () => {
      // call.end();
      subject.complete();
    });

    return subject.asObservable();
  }
}
