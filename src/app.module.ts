import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { IdeaModule } from './ideas/idea.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [IdeaModule,
    MongooseModule.forRoot('mongodb+srv://storm:admin@cluster0-fydzq.mongodb.net/ideas-app?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  },
  {
    provide: APP_PIPE,
    useClass: ValidationPipe
  }],
})
export class AppModule {}
