import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() user: Partial<User>) {
        return this.usersService.create(user);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(Number(id));
    }
    @Patch(':id')
    updateUser(
        @Param('id') id: string,
        @Body() updateData: UpdateUserDto,
    ) {
        return this.usersService.updateUser(Number(id), updateData);
    }
}
