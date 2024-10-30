import { Module } from "@nestjs/common"
import { UserController } from "./users.controller"
import { UsersService } from "./user.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { user } from "./entities/user.entity"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule } from "@nestjs/config"

@Module({
    controllers: [UserController],
    providers: [UsersService],
    imports:[
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([
            user
        ]),
        JwtModule.register({
            secret:process.env.JWT_SECRET,
            global:true, 
            signOptions:{expiresIn:'10m'}
        })

    ]
})

export class UserModule{}