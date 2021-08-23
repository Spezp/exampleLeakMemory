import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MODEL, ExampleSchema } from './entity/example.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: MODEL.EXAMPLE, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
  exports: [ExampleService],
})
export class ExampleModule {}
