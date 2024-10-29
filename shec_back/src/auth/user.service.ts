import { All, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './entities/user.entity';
import { error } from 'console';
import internal from 'stream';
import e from 'express';

@Injectable()
export class UsersService {
  constructor(

    @InjectRepository(user)
    private readonly userRepository:Repository<user>

  ){}
  
  users = [];

  findAll(){
    return this.userRepository.find();
  }


  findById(id:string){
    return this.userRepository.find({where:{id_client: +id}})
  }


  async createUser(CreateUserDto:CreateUserDto){
    try{
      const newUser = this.userRepository.create(CreateUserDto);
      return await this.userRepository.save(newUser);
    }catch(error){
      if(error.code === '23505'){
        throw new InternalServerErrorException('value already exist')}
      console.log(error)
      throw new InternalServerErrorException('Unknown error')
    }
  }

  updateUser(id:string, updateUser:UpdateUserDto){
    this.users = this.users.map(user => 
      user.id === id 
        ? {...user, ...updateUser}
        : user
    );
  }

  deleteUser(id:string){
    this.users = this.users
      .filter(user=>user.id!==id);
  }

}
