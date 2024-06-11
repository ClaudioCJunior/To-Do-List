import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AppService } from 'src/app.service';

@Injectable()
export class UsersService extends AppService<User>{
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  findOneByEmail(email: string) {
    return this.userModel
      .findOne({
        email: email,
      })
      .exec();
  }
}
