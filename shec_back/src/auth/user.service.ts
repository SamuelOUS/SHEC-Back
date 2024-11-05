import { All, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs'
import { loginUserDto } from './dto/login-user.dto';
import { JwtSecretRequestType, JwtService} from '@nestjs/jwt';


@Injectable()
export class UsersService {
  
  constructor(
    
    @InjectRepository(user)
    private readonly userRepository:Repository<user>,
    private jwtService :JwtService
    
  ){}
  
  async findAll(skip: number, take:number) {
    const result = await this.userRepository.find({take: take, skip: skip });  // Obtiene todos los usuarios sin filtro adicional
    return result.map(item => {
      const { password, ...user } = item;  // Excluye el atributo `password` en la respuesta
      return user;
    });
  }
  
  
  findById(id:string){
    return this.userRepository.find({where:{id_client: +id}})
  }
  
  
  async createUser(CreateUserDto:CreateUserDto){
    try{
      const {password, ...newUser} = CreateUserDto;
      const userDB = this.userRepository.create({
        password: bcryptjs.hashSync(password),
        ...newUser
        
      });
      
      const {password:_, ...userAdded} = await this.userRepository.save(userDB)
      return userAdded;
    }catch(error){
      if(error.code === '23505'){
        throw new InternalServerErrorException('value already exist')}
        console.log(error)
        throw new InternalServerErrorException('Unknown error')
      }
    }
    
    async login(loginUser: loginUserDto) {
      const { password, email} = loginUser;
      const user = await this.userRepository.find({where:{email}})

      if(user.length === 0 || this.notValidUser(user[0], password)){
        throw new ForbiddenException('incorrect user');
      }
      return{
        name: user[0].name,
        email: user[0].email,
        password: user[0].password,
        token : this.jwtService.sign({email:user[0].email, id_client:user[0].id_client})
        
   
      }
      }

      private notValidUser(user:user, password:string):boolean{
        return !bcryptjs.compareSync(password, user.password);
      
      }

}
