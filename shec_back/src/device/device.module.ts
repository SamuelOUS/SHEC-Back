import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { device } from './entities/device.entity';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports : [ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
        device
    ])]
})
export class DeviceModule {}
