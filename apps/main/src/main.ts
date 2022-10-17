import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {

  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const microservice = app.connectMicroservice( {
    transport: Transport.RMQ,
    options: {
        urls: ['amqp://localhost:5672'],
        queue: 'nest_services',
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