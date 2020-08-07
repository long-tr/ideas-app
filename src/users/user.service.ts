import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('users') private _userModel: Model<User>
    ){}

    async getAll(): Promise<User[]>{
        return this._userModel.find().select('-password').exec()
    }

    async create(userDto: UserDto): Promise<User>{
        const {
            username
        } = userDto
        const user = await this._userModel.findOne({ username })
        if(user){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }
        const createdUser = new this._userModel(userDto)
        await createdUser.save()
        return createdUser.toResponseObject()

    }

    async login(userDto: UserDto): Promise<User>{
        const {
            username,
            password
        } = userDto
        const user = await this._userModel.findOne({ username })
        if(!user){
            throw new HttpException('Invalid username', HttpStatus.BAD_REQUEST)
        }
        if(!await user.comparePassword(password)){
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST)
        }
        return user.toResponseObject(true)
    }
}
