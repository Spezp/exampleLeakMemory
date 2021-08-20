import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Example extends mongoose.Document {
  @Prop()
  example: number;

  @Prop({ default: '' })
  name: string;
}

const ExampleSchema = SchemaFactory.createForClass(Example);

export { ExampleSchema };
