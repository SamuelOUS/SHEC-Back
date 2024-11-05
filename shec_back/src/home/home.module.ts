import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { home } from './entities/home.entity';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports : [ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
        home
    ])]
})
export class HomeModule {}
