import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { JwtService } from '@nestjs/jwt';
import { Response } from "express";

@Controller('/user')
export class UserController {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  @Post('/signup')
  async Signup(@Res() response: Response, @Body() user: User) {
    console.log("user", user)
    const newUser = await this.userService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUser
    })
  }

  @Post('/signin')
  async SignIn(@Res() response: Response, @Body() user: User) {
    const token = await this.userService.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token)
  }

  @Post('/getuser')
  async getOne(@Res() response: Response, @Body() body: {email: string}) {
    const user = await this.userService.getOne(body.email);
    return response.status(HttpStatus.CREATED).json({
      user
    })
  }

}

