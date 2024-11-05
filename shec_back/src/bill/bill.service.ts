import { CreateBillDto } from './dto/create-bill-dto';
import { bill } from './entities/bill.entity';
import { All, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class billService {
  constructor(
    
    @InjectRepository(bill)
    private readonly billRepository:Repository<bill>,
    
  ){}

  async findAll(skip: number, take:number) {
    const result = await this.billRepository.find({take: take, skip: skip });  // Obtiene todos los usuarios sin filtro adicional
    return result
    };
    
    
    findOne(id_bill: string){
      return this.billRepository.find({where:{id_bill: id_bill}})
    }
    
    
    async createBill(CreateBillDto:CreateBillDto){
      try{
        const bill = CreateBillDto;
        const billDB = this.billRepository.create({ 
        });
        
        const savedBillDB = await this.billRepository.save(billDB)
        return savedBillDB
        ;
      }catch(error){
        if(error.code === '23505'){
          throw new InternalServerErrorException('value already exist')}
          console.log(error)
          throw new InternalServerErrorException('Unknown error')
        }
      }
      
    }

