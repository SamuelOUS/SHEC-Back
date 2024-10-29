import { Module } from "@nestjs/common"
import { UserController } from "./users.controller"
import { UsersService } from "./user.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { user } from "./entities/user.entity"

@Module({
    controllers: [UserController],
    providers: [UsersService],
    imports:[
        TypeOrmModule.forFeature([
            user
        ])

    ]
})

export class UserModule{}