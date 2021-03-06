import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const method = req.method
    const url = req.url
    // Logger.log(JSON.stringify(req))
    return next
      .handle()
      .pipe(
        tap(() => Logger.log(`${ method } ${ url } ${ Date.now() - now }ms`, context.getClass().name))
      );
  }
}