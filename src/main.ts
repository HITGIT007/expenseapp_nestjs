import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //By this we want to enable global pipes in our application
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,//This whitelist by default is false
        //It whitelist anything that is not defined in the dto i.e., it completely gets rid of it
    })
  );
  await app.listen(3000);
}
bootstrap();
