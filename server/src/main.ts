import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  try {
    const PORT = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () =>
      console.log(`server has been started on PORT ${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}
start();
