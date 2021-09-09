import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsController } from './albums.controller';
import { HttpModule } from '@nestjs/axios';

describe('AlbumsController', () => {
  let controller: AlbumsController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AlbumsController],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
