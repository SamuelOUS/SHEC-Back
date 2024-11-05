import { Module } from '@nestjs/common';
import { UserController } from './auth/users.controller';
import { UsersService } from './auth/user.service';
import { HomeModule } from './home/home.module';
import { DeviceModule } from './device/device.module';
import { UserModule } from './auth/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillModule } from './bill/bill.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.AP_DB_HOST,
      database:process.env.AP_DB_NAME,
      port:+process.env.AP_DB_PORT,
      username:process.env.AP_DB_USER,
      password:process.env.AP_DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:false
    }),
    HomeModule,
     DeviceModule, 
     UserModule, BillModule],
  controllers: [],
  providers: [],
})
export class AppModule {}