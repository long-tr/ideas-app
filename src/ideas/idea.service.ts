import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Idea } from './idea.schema';
import { Model } from 'mongoose';
import { createIdeaDto, updateIdeaDto } from './idea.dto';

@Injectable()
export class IdeaService {
    constructor(@InjectModel('ideas') private _ideaModel: Model<Idea> ){}

    async getAllIdeas(): Promise<Idea[]>{
        return this._ideaModel.find().exec()
    }

    async getIdeaById(id: string): Promise<Idea>{
        return this._ideaModel.findById(id)
    }

    async createIdea(idea: createIdeaDto): Promise<Idea>{
        const createIdea = new this._ideaModel(idea)
        return await createIdea.save()
    }

    async updateById(id: string, ideaDto: updateIdeaDto): Promise<Idea>{
        const idea = await this._ideaModel.findById(id)
        await idea.updateOne(ideaDto)
        return await this._ideaModel.findById(id)
    }

    async deleteById(id: string): Promise<Idea>{
        return this._ideaModel.findByIdAndRemove(id)
    }
}
