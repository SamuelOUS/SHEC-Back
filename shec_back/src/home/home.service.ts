import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { home } from './entities/home.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class HomeService {

  constructor(

    @InjectRepository(home)
    private readonly homeRepository: Repository<home>,

  ) { }

  async findAll(skip: number, take: number) {
    const result = await this.homeRepository.find({ take: take, skip: skip });  // Obtiene todos los usuarios sin filtro adicional
    return result
  };


  findOne(id_homes: number) {
    return this.homeRepository.find({ where: { id_home: +id_homes } })
  }


  async createHome(CreateHomeDto: CreateHomeDto) {
    try {
      const home = CreateHomeDto;
      const homeDB = this.homeRepository.create({
      });

      const savedHomeDB = await this.homeRepository.save(homeDB)
      return savedHomeDB
        ;
    } catch (error) {
      if (error.code === '23505') {
        throw new InternalServerErrorException('value already exist')
      }
      console.log(error)
      throw new InternalServerErrorException('Unknown error')
    }
  }
}
