import{
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
 } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { RegisterDTO } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ){}

    async signIn(email: string, passwird: string) {
        const user: User | null = await this.userService.findByEmail(email);
        if (user == null || !bcrypt.compareSync(passwird, user?.password_hash)) {
            throw new UnauthorizedException();
        }
        const payload: JwtPayload = {
            sub: user.id, email: user.email,
            exp : 0
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(RegisterDTO: RegisterDTO){
        const existedUser: User | null =
        await this.userService.findByEmailOrUsername(
            RegisterDTO.email, 
            RegisterDTO.username
        );
        if (existedUser) {
            throw new HttpException(
                'Email or username already exists',
                HttpStatus.CONFLICT,
            );
        }
        const user = new User();
        user.email = RegisterDTO.email;
        user.username = RegisterDTO.username;
        user.password_hash = bcrypt.hashSync(RegisterDTO.password, 10);
        await this.userService.save(user);
    }
}