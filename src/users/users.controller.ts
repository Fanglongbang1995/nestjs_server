import {
  Controller,
  Get,
  Post,
  HttpCode,
  Query,
  Body,
  Render,
  Response,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Header,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { users } from '../entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService,private readonly userService: UsersService) {}

  @Get('test')
  getTest(){
    let res = this.userService.wxtset()
    console.log('请求返回数据',res)
    return res
  }

  // @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('register')
  async register(@Body() body: any) {
    return await this.userService.register(body);
  }

  @Post('login')
  async login(@Body() body): Promise<any> {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(body.userName, body.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }

  }


//  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('upload/headerphoto')
  @HttpCode(200)
  // @Header('Cache-Control', 'none') //响应头
  @UseInterceptors(FileInterceptor('file'))
  addUser(@UploadedFile() file, @Body() body) {
    console.log(file)
    const writeFile = createWriteStream(
      join(__dirname, '..', '../public/upload', `${file.originalname}`),
    );
    writeFile.write(file.buffer);
    return { code: 200, success: true };
  }
}
