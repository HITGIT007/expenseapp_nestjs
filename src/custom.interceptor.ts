//Custom Interceptor
//Not Used
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

//The NESTInterceptor is a class of its own and by itself it has all the properties it needs to created an interceptor in NEST
//Create a custom interceptor and I want to implement like a NEST interceptor
export class CustomInterceptor implements NestInterceptor {
  //This intecept method is going to take in two parameters
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('Anything outside the pipe is going to used for intercepting the request');
    console.log({context});
    return handler.handle().pipe(
      map((data) => {
        console.log('Anything inside the pipe is intercepting the outgoing response');
        console.log(data);
        const response = {
          ...data,
          createdAt: data.created_at,
        };
        delete response.updated_at;
        delete response.created_at;

        return response;
      }),
    );
  }
}
