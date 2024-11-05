import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UsersService){}

  @Get()
  findAll(@Query('take') take:number, @Query('skip') skip:number){

    return this.UserService.findAll(skip,take);
  }

  @Get(':id')
  findById(@Param('id') id:string){   
    return this.UserService.findById(id);
  }

  @Post()
  createUser(@Body() request:CreateUserDto){  
    console.log(request)
    this.UserService.createUser(request);
  }

  @Post('login')
  login(@Body() loginUserDto: loginUserDto){

    return this.UserService.login(loginUserDto);
  }



}