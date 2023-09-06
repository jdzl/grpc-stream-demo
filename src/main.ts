// grpc.server.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'contact', // Define your gRPC package name
        protoPath: join(__dirname, '../contact.proto'), // Specify the path to your gRPC proto file
        url: '0.0.0.0:8000',
      },
    },
  );

  // add rest
  const appRest = await NestFactory.create(AppModule);
  await appRest.listen(3000);
  await app.listen();
  console.log('Microservice is listening');
}
bootstrap();
