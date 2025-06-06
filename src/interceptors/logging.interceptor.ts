import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomProperty } from '../decorators/custom.decorator';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const prop = this.reflector.get<CustomProperty>('custom_property', context.getHandler());
    if (prop?.enableLog && prop.message) {
      console.log(`Log: ${prop.message}`);
    }
    return next.handle().pipe(
      tap(() => {
        if (prop?.enableLog && prop.message) {
          console.log(`Completed: ${prop.message}`);
        }
      })
    );
  }
}
