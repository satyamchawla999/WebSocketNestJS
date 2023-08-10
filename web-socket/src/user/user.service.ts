import { Injectable, HttpException, HttpStatus, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async signup(user: User): Promise<User> {
        try {
            const foundUser = await this.userModel.findOne({ email: user.email }).exec();
            if (foundUser)
                throw new Error
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            const reqBody = {
                name: user.name,
                email: user.email,
                password: hash
            }
            const newUser = new this.userModel(reqBody);
            return newUser.save();
        } catch (err) {
            throw new ConflictException()
        }

    }

    async signin(user: User, jwt: JwtService): Promise<any> {
        const foundUser = await this.userModel.findOne({ email: user.email }).exec();
        const allUsers = await this.userModel.find().exec();
        // console.log('allusers',allUsers)
        // console.log('foundUser',foundUser)
        if (foundUser) {
            const { password } = foundUser;
            if (bcrypt.compare(user.password, password)) {
                const payload = { email: user.email };
                return {
                    user: foundUser,
                    allUsers,
                    token: jwt.sign(payload),
                };
            }
            return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
        }
        return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }

    async getOne(email): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }
}
