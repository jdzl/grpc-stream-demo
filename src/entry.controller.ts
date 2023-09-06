import { Controller, Get } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

interface TaskService {
  streamTasks(data: { name: string }): Observable<any>;
}

@Controller('demo')
export class EntryController {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'contact',
      protoPath: join(__dirname, '../contact.proto'),
      url: 'localhost:8000',
    },
  })
  private readonly client: ClientGrpc;
  private grpcService: any;

  onModuleInit() {
    this.grpcService = this.client.getService<TaskService>('TaskService');
  }

  @Get()
  async callStreamDemo() {
    const grpcStream = this.grpcService.streamTasks({ name: 'davod' });

    let counter = 0;
    grpcStream.subscribe({
      next: (data) => {
        counter++;
        console.log(`Data ${counter}: `, data);
      },
      error: (error) => {
        console.error('Error streaming data:', error);
      },
      complete: () => {
        console.log('End of stream');
      },
    });

    return 'ok madafaka';
  }
}
