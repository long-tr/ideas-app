import { Schema, Document } from 'mongoose';

export interface Idea extends Document{
    idea: string,
    description: string
}
export const IdeaSchema = new Schema({
    idea: String,
    description: String},
    {
    timestamps: true
})