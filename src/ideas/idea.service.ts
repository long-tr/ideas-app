import { Injectable } from '@nestjs/common';

@Injectable()
export class IdeaService {
    getAllIdeas(){
        return 'Get all ideas'
    }

    getIdeaById(id: string){
        return `Get idea has id ${id}`
    }

    createIdea(idea){
        return `Create idea`
    }

    updateById(id: string, idea){
        return `Update idea has id ${id}`
    }

    deleteById(id: string){
        return `Remove idea has id ${id}`
    }
}
