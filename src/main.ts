import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

const start = async () => {
  try {
    const port = process.env.MUZPORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(port, () =>
      console.log(`Muz platform started at ${port}`),
    );
  } catch (e) {
    console.log(e);
  }
};

start();
