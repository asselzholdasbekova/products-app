import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {

  const PORT = process.env.MAIN_PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const rmq_host = process.env.RABBITMQ_HOST;
  const rmq_port = process.env.RABBITMQ_PORT;
  const rmq_queue = process.env.RABBITMQ_QUEUE_NAME;

  const microservice = app.connectMicroservice( {
    transport: Transport.RMQ,
    options: {
        urls: [`amqp://${rmq_host}:${rmq_port}`],
        queue: rmq_queue,
        queueOptions: {
            durable: false
        }
    }
  });
  
  await app.startAllMicroservices();
  await app.listen(PORT, () => 
    console.log('Server started on port ' + PORT)
  );

}
bootstrap();