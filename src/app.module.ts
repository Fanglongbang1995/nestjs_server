import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from "./users/users.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '106.55.15.66',
      port: 3306,
      username: 'root',
      password: '123456',
      database:'blog',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // 加载子模块
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController,UsersController],
  providers: [AppService],
})
export class AppModule {}
