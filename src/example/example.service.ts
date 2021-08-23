import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Example, MODEL } from './entity/example.entity';
@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(MODEL.EXAMPLE)
    private exampleModel: mongoose.Model<Example>,
  ) {}

  findAll() {
    return this.exampleModel.find();
  }

  getHello() {
    return 'hello';
  }

  findOne(id: string) {
    const example = this.exampleModel.find({ _id: id });
    if (!example) throw new NotFoundException(`example #${id} is not found`);
    return example;
  }

  async create(createExampleDto: any) {
    const example = new this.exampleModel(createExampleDto);
    await example.save();
    return createExampleDto;
  }
}
