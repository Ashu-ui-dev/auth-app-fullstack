"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const auth_service_1 = require("../auth/auth.service");
const signup_dto_1 = require("./dto/signup.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UserController = UserController_1 = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async signUp(signUpDto, res) {
        this.logger.log(`Sign up request received for email: ${signUpDto.email}`);
        try {
            const { email, name, password } = signUpDto;
            const user = await this.userService.signUp(email, name, password);
            const jwt = await this.authService.login(user);
            this.logger.log(`User signed up and logged in successfully: ${email}`);
            res.cookie('jwt', jwt.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                sameSite: 'none',
                domain: process.env.NODE_ENV === 'production'
                    ? process.env.BASE_DOMAIN
                    : undefined,
            });
            return res.status(common_1.HttpStatus.OK).send({
                message: 'User registered and logged in successfully',
            });
        }
        catch (error) {
            this.logger.error(`Error during sign up for email: ${signUpDto.email}`, error.stack);
            if (error instanceof common_1.ConflictException) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    message: error.message,
                });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong, please try again',
            });
        }
    }
    async getProfile(req, res) {
        this.logger.log('Profile request received');
        const user = req.headers;
        if (!user) {
            this.logger.warn('Unauthorized profile access attempt');
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        this.logger.log('Profile successfully retrieved');
        return res.status(200).json({ user });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User registered and logged in successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email is already registered' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map