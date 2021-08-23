import { TestingModule, Test } from '@nestjs/testing';
import { ExampleSchema, MODEL } from './entity/example.entity';
import { ExampleService } from './example.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  getConnectionToken,
  MongooseModuleOptions,
  MongooseModule,
} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

describe('example e2e test', () => {
  let mongod: MongoMemoryServer;
  let connection: mongoose.Connection;
  const dbModule = (customOpts: MongooseModuleOptions = {}) =>
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongod = new MongoMemoryServer();
        const uri = await mongod.getUri();
        return {
          uri,
          ...customOpts,
        };
      },
    });
  let service;
  let module: TestingModule;
  beforeEach(async () => {
    try {
      module = await Test.createTestingModule({
        imports: [
          dbModule(),
          MongooseModule.forFeature([
            { name: MODEL.EXAMPLE, schema: ExampleSchema },
          ]),
        ],
        providers: [ExampleService],
      }).compile();
      connection = module.get(getConnectionToken());
      service = module.get<ExampleService>(ExampleService);
    } catch (err) {
      console.log(err);
    }
  });

  afterEach(async () => {
    try {
      await connection.close();
      await mongod.stop();
    } catch (err) {
      console.log(err);
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
//
//
