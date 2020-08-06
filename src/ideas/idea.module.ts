import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { IdeaSchema } from './idea.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'ideas', schema: IdeaSchema }])],
    controllers: [IdeaController],
    providers: [IdeaService]
})
export class IdeaModule {}
