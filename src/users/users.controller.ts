import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpService } from '@nestjs/axios';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('users')
export class UsersController {
    constructor(
        private httpService: HttpService,
    ) {}

    @Get()
    @ApiOperation({summary: "Displays all registered users. (copy any username to login)"})
    @ApiProperty()
    async findAllUsers() {
        const response = await this.httpService.get('https://jsonplaceholder.typicode.com/users').toPromise();
        var person_list = []
        for (let i=0; i < response.data.length; i++) {
        person_list.push({
            "name": response.data[i].name, 
            "username": response.data[i].username, 
            "email": response.data[i].email,
        });
    }
    return person_list;
  }

    
}
