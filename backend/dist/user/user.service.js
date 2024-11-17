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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const auth_service_1 = require("../auth/auth.service");
let UserService = UserService_1 = class UserService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async signUp(email, name, password) {
        try {
            this.logger.log(`Creating new user in the database with email: ${email}`);
            const user = new this.userModel({ email, name, password });
            await user.save();
            return user;
        }
        catch (error) {
            this.logger.error(`Error during user creation for email: ${email}`, error.stack);
            if (error.code === 11000) {
                throw new common_1.ConflictException('Email is already registered');
            }
            throw error;
        }
    }
    async validateUser(email, password) {
        this.logger.log(`Looking for user in the database with email: ${email}`);
        const user = await this.userModel.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            this.logger.log(`User found and password validated for email: ${email}`);
            return user;
        }
        this.logger.warn(`Invalid credentials for email: ${email}`);
        return null;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map