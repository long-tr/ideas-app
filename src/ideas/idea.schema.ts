import { Schema, Document } from 'mongoose';

export interface Idea extends Document{
    idea: string,
    description: string,
    created: Date,
    updated: Date
}
export const IdeaSchema = new Schema({
    idea: String,
    description: String},
    {
    timestamps: true
})