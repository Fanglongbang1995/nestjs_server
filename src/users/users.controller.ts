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
  Header,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { UsersService } from './users.service';
import { users } from '../entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('userInfoById')
  findUserInfoById(@Query('id') id): Promise<users> {
    return this.userService.findUserInfoById(id);
  }

  @Post('login')
  login(@Body() body): Promise<users> {
    console.log('登陆111', body);
    return this.userService.login(body);
  }

  @Post('upload/headerphoto')
  @HttpCode(200)
  // @Header('Cache-Control', 'none') //响应头
  @UseInterceptors(FileInterceptor('file'))
  addUser(@UploadedFile() file, @Body() body) {
    const writeFile = createWriteStream(
      join(__dirname, '..', '../public/upload', `${file.originalname}`),
    );
    writeFile.write(file.buffer);
    return { code: 200, success: true };
  }
}
