import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { device } from './entities/device.entity';
import { All, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class DeviceService {
  constructor(
    
    @InjectRepository(device)
    private readonly deviceRepository:Repository<device>,
    
  ){}

  async findAll(skip: number, take:number) {
    const result = await this.deviceRepository.find({take: take, skip: skip });  // Obtiene todos los usuarios sin filtro adicional
    return result
    };
    
    
    findOne(id_devices: number){
      return this.deviceRepository.find({where:{id_devices: +id_devices}})
    }
    
    
    async createDevice(CreateDeviceDto:CreateDeviceDto){
      try{
        const device = CreateDeviceDto;
        const deviceDB = this.deviceRepository.create({ 
        });
        
        const savedDeviceDB = await this.deviceRepository.save(deviceDB)
        return savedDeviceDB
        ;
      }catch(error){
        if(error.code === '23505'){
          throw new InternalServerErrorException('value already exist')}
          console.log(error)
          throw new InternalServerErrorException('Unknown error')
        }
      }
      
    }

