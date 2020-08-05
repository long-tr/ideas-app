import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
    constructor(
        private _ideaService: IdeaService
    ){}

    @Get()
    async getAllIdeas(){
        return this._ideaService.getAllIdeas()
    }
    
    @Get(':id')
    async getIdeaById(@Param('id') id: string){
        return this._ideaService.getIdeaById(id)
    }

    @Post()
    async createIdea(@Body() idea){
        return this._ideaService.createIdea(idea)
    }

    @Put()
    async updateIdea(@Param('id') id: string, @Body() idea){
        return this._ideaService.updateById(id, idea)
    }

    @Delete()
    async deleteIdea(@Param('id') id: string){
        return this._ideaService.deleteById(id)
    }
}
