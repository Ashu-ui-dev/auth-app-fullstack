import { Document } from 'mongoose';
export type UserDocument = User & Document & {
    comparePassword(candidatePassword: string): Promise<boolean>;
};
declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    email: string;
    name: string;
    password: string;
    role: UserRole;
    isEmailVerified: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
export {};
