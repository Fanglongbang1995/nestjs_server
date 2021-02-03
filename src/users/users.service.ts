import { Injectable,HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from '../entities/users.entity';
import { makeSalt, encryptPassword } from '../../utils/cryptogram'; // 引入加密函数
@Injectable()
export class UsersService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(users)
    private readonly userRepository: Repository<users>,
    private readonly httpService: HttpService,
  ) {}


  wxtset(){
    return this.httpService.get('http://localhost:3000')
  }

  /**
   * 查询是否有该用户
   * @param userName 用户名
   */

  async queryUser(userName: string): Promise<any | undefined> {
    try {
      let user = await this.userRepository.findOne({ name: userName });
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

   /**
   * 注册
   * @param requestBody 请求体
   */

  async register(requestBody: any): Promise<any> {
    const { userName, age,gender,profile, password } = requestBody;
    const user = await this.queryUser(userName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    let newUser = {
      name:userName,
      password:hashPwd,
      password_salt:salt,
      gender:gender,
      age:age,
      profile:profile
    }
    try {
      console.log(newUser)
      await this.userRepository.save(newUser)
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

}
