import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtGuard } from './guards/jwt-auth.guard';
import { Me } from './guards/me.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req) {
        return this.authService.sign(req.user)
    }

    @Post('register')
    register(@Body() CreateUserDto: CreateUserDto) {
        return this.authService.registerUser(CreateUserDto)
    }

    @Get('profile')
    @UseGuards(JwtGuard)
    profile(@Me() me) {
        return me
    }


}
