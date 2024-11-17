import { Response } from 'express';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { SignUpDto } from './dto/signup.dto';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    private readonly logger;
    constructor(userService: UserService, authService: AuthService);
    signUp(signUpDto: SignUpDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
