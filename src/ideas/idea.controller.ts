import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Idea } from './idea.schema';
import { createIdeaDto, updateIdeaDto } from './idea.dto';

@Controller('idea')
export class IdeaController {
    constructor(
        private _ideaService: IdeaService
    ){}

    @Get()
    async getAllIdeas(): Promise<Idea[]>{
        return this._ideaService.getAllIdeas()
    }
    
    @Get(':id')
    async getIdeaById(@Param('id') id: string): Promise<Idea>{
        return this._ideaService.getIdeaById(id)
    }

    @Post()
    async createIdea(@Body() idea: createIdeaDto): Promise<Idea>{
        return this._ideaService.createIdea(idea)
    }

    @Put(':id')
    async updateIdea(@Param('id') id: string, @Body() idea: updateIdeaDto): Promise<Idea>{
        return this._ideaService.updateById(id, idea)
    }

    @Delete(':id')
    async deleteIdea(@Param('id') id: string): Promise<Idea>{
        return this._ideaService.deleteById(id)
    }
}
