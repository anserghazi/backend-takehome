import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //     album_ids: [1,2,3,4]
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //     album_ids: [1,2,3,4]
  //   },
  // ];

  private readonly person_list = []


  async findOne(username: string): Promise<User | undefined> {
    const response = await this.httpService.get('https://jsonplaceholder.typicode.com/users').toPromise();
    for (let i=0; i < response.data.length; i++) {
      this.person_list.push({
        "id": response.data[i].id,
        "name": response.data[i].name, 
        "username": response.data[i].username, 
        "password": "admin",
        "email": response.data[i].email,
      });
    }

    return this.person_list.find(user => user.username === username);
  }
}