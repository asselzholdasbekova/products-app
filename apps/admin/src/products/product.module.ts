import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
      TypeOrmModule.forFeature([Product]),
      ClientsModule.register([{
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'nest_services',
          queueOptions: {
            durable: false
          }
        }
      }]),
    ],
    controllers: [ProductController],
    providers: [ProductService]
  })
  export class ProductModule {}