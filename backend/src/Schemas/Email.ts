import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type EmailContet = HydratedDocument<Email>;
@Schema()
export class Email{
    @Prop()
    template: string
    @Prop()
    title: string
    @Prop()
    created_at: Date;
    @Prop()
    updated_at: Date;
}

export const emailSchema = SchemaFactory.createForClass(Email);