import { Module ,HttpModule} from '@nestjs/common';
import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from '../entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([users]),HttpModule],
  providers: [UsersService],
  exports: [UsersService],
  // controllers: [UsersController]
})
export class UsersModule {}
