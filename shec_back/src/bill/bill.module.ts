import { Module } from '@nestjs/common';
import { billService } from './bill.service';
import { billController } from './bill.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bill } from './entities/bill.entity';

@Module({
  controllers: [billController],
  providers: [billService],
  imports : [ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
        bill
    ])]
})
export class BillModule {}
