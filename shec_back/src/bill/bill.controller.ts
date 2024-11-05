import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { billService } from './bill.service';
import { CreateBillDto } from './dto/create-bill-dto';
import { skip } from 'node:test';
import { table } from 'node:console';

@Controller('bill')
export class billController {
  constructor(private readonly billService: billService) {}

  @Post()
  create(@Body() CreateBillDto: CreateBillDto) {
    return this.billService.createBill(CreateBillDto);
  }

  @Get()
  findAll(@Query('take') take:number, @Query('skip') skip:number) {
    return this.billService.findAll(skip,take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

}
