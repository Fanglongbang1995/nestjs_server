import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from '../entities/users.entity';
@Injectable()
export class UsersService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(users)
    private readonly userRepository: Repository<users>,
  ) {}

  async login(body): Promise<users> {
    let res = await this.userRepository.findOne({
      name: body.userName,
      password: body.password,
    });
    console.log('res', res);
    return res;
  }

  // 获取所有用户数据列表(userRepository.query()方法属于typeoram)
  async findUserInfoById(id): Promise<users> {
    let res = await this.userRepository.query(
      `select * from user where id = ${id}`,
    );
    console.log('res', res);
    return res;
  }
}
