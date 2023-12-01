import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, path: url } = context.switchToHttp().getRequest();

    const functionName = context.getHandler().name;
    console.log(`[LOG] Endpoint: ${method} ${url} ${functionName}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`[LOG] Done after... ${Date.now() - now}ms`)),
      );
  }
}
