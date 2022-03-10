import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummaryModule } from './summary/summary.module';
import { ReportModule } from './report/report.module';
//Module is where our dependencies are added and managed in our file
@Module({
  imports: [SummaryModule, ReportModule],
  controllers: [AppController],
  //Providers is where we provide our services which we want to utilize in our module
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,//Here we are saying that we want to provide an app interceptor which means that for every single end-point
      //i.e HTTP request we want to apply an intereceptor. Below the ClassSerializerInterceptor is what's going to be applied
      useClass: ClassSerializerInterceptor,
      //Serializer is a way where we can modify and change our data
    },
  ],
})
export class AppModule {}


//Interceptor in NESTJS : https://docs.nestjs.com/interceptors
/* 
A client(could be a postman or real website) is gonna make a request to NEST API and our NEST API is going to process that request
and send back a response.
A Interceptor is something that lies between an request and a response.
When a client is sending a request to the server before actually reaching to the server the request is going to be get intercepted
by the server.
In the same way an interceptor can also be intercepted by a response.
The interceptor can do some sort of processing and then send the request or response. 
*/

