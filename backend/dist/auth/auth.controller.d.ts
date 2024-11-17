import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from '../user/dto/signin.dto';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
}
