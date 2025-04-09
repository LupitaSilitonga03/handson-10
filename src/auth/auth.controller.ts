import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    signIn(@Body() loginDTO: LoginDto) {
        return this.authService.signIn(loginDTO.email, loginDTO.password);
    }

    @Post('register')
    register(@Body() registerDTO: RegisterDTO) {
        return this.authService.register(registerDTO);
    }
}