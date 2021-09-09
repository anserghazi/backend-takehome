import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';
import {  ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()
@ApiTags('albums')
@Controller('albums')
export class AlbumsController {
  constructor(
    private httpService: HttpService,
    ) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary: "Returns all albums associated with the user."})
  async findAllAlbums(@Request() req) {
    const response = await this.httpService.get('https://jsonplaceholder.typicode.com/albums').toPromise();
    var album_list = []
    for (let i=0; i < response.data.length; i++) {
      if (response.data[i].userId == req.user.id) {
        album_list.push({
          'album_id': response.data[i].id,
          'title': response.data[i].title,
        });
      }
    }
    return album_list;
  }

  
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary: "Returns a specific album associated with the user."})
  @ApiParam({ 
    name: 'id',
    type: String,
    required: true})
  async findAlbum(@Request() req) {
    if (req.params.id <= 100 && req.params.id > 0) {
      const response = await this.httpService.get(`https://jsonplaceholder.typicode.com/albums/${req.params.id}`).toPromise();
      if (response.data.userId == req.user.id) {
        return response.data;
      }
      else {
        return `Logged in user does not have access to album #${req.params.id}.`;
      }
      
    }
    else {
      return "This album does not exist."
    }
  }
  
}
