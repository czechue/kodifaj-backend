import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieSession from 'cookie-session';
import passport from 'passport';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY],
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

bootstrap();
