import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UsersService){}

  @Get()
  findAll(){
    return this.UserService.findAll();
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

  @Put(':id')
  updateUser(@Param('id') id:string, @Body() request:UpdateUserDto){
    this.UserService.updateUser(id, request);
  }

  @Delete(':id')
  deleteUser(@Param('id') id:string){
    this.UserService.deleteUser(id);
  }

}