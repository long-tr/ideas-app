import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserDto } from './user.dto';
import { UserDeco } from 'src/shared/decorators/user.decorator';
import { AuthGuard } from 'src/shared/guard/auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private _userService: UserService
    ){}

    @Get()
    @UseGuards(new AuthGuard())
    async getAllUsers(@UserDeco() user): Promise<User[]>{
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
