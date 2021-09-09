import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';

describe('UsersController', () => {
  let usersController: UsersController;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [UsersController],
      providers: [UsersService],
    })
    .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should call this function', async () => {
    const all_users: any[] = [];
    jest.spyOn(usersController, 'findAllUsers').mockImplementation(async() => all_users);

  });
  
});
