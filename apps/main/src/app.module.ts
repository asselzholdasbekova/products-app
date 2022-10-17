import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nest_services',
      {
        autoCreate: true,
      }
    ),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
