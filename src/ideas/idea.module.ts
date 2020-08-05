import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';

@Module({
    imports: [IdeaController]
})
export class IdeaModule {}
