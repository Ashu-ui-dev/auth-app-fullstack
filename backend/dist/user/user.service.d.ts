import { Model } from 'mongoose';
import { UserDocument, User } from './schema/user.schema';
import { AuthService } from '../auth/auth.service';
export declare class UserService {
    private userModel;
    private authService;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, authService: AuthService);
    signUp(email: string, name: string, password: string): Promise<User>;
    validateUser(email: string, password: string): Promise<User | null>;
}
