import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';

async function initRoles(app: INestApplication) {
  const r = app.get(RolesService);
  const u = app.get(UsersService);

  try {
    await r.create({ value: 'USER', description: 'Пользователь' });
  } catch (error) {
    console.log(error);
  }

  try {
    await r.create({ value: 'ADMIN', description: 'Администратор' });
  } catch (error) {
    console.log(error);
  }

  try {
    const admin = await u.create({
      email: 'admin@admin.admin',
      password: '12345Admin',
    });
    const role = await r.findOne({ value: 'ADMIN' });
    admin.$add('roles', [role]);
  } catch (error) {
    console.log(error);
  }

  try {
    await u.create({
      email: 'user@user.user',
      password: '12345User',
    });
  } catch (error) {
    console.log(error);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'dev') await initRoles(app);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
