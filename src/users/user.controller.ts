import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(
        private _userService: UserService
    ){}

    @Get()
    async getAllUsers(): Promise<User[]>{
        return this._userService.getAll()
    }

    @Post()
    async login(@Body() user: UserDto): Promise<User>{
        return this._userService.login(user)
    }

    @Post('register')
    async register(@Body() user: UserDto): Promise<User>{
        return this._userService.create(user)
    }
}
