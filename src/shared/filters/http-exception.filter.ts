import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const method = request.method
        const msg = exception.message
        response.status(status).json({
            status: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: method,
            message: msg
        })
    }
}