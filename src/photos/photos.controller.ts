import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(
    private httpService: HttpService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary: "Returns all photos associated with the user."})
  async findAllPhotos(@Request() req) {
    const album_response = await this.httpService.get('https://jsonplaceholder.typicode.com/albums').toPromise();
    const photo_response = await this.httpService.get('https://jsonplaceholder.typicode.com/photos').toPromise();
    var album_list = []
    for (let i=0; i < album_response.data.length; i++) {
      if (album_response.data[i].userId == req.user.id) {
        album_list.push(album_response.data[i].id);
      }
    }

    var photo_list = []
    for (let i=0; i < photo_response.data.length; i++) {
      if (album_list.includes(photo_response.data[i].albumId)) {
        photo_list.push({
          'album_id': photo_response.data[i].albumId,
          'photo_id': photo_response.data[i].id,
          'title': photo_response.data[i].title,
          'url': photo_response.data[i].url,
        });
      }
    }
    return photo_list;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary: "Returns a specific photo associated with the user."})
  @ApiParam({ 
    name: 'id',
    type: String,
    required: true})
  async findPhoto(@Request() req) {
    const album_response = await this.httpService.get('https://jsonplaceholder.typicode.com/albums').toPromise();
    if (req.params.id <= 5000 && req.params.id > 0) {
      const photo_response = await this.httpService.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`).toPromise();
      var album_list = []
      for (let i=0; i < album_response.data.length; i++) {
        if (album_response.data[i].userId == req.user.id) {
          album_list.push(album_response.data[i].id);
        }
      }
      if (album_list.includes(photo_response.data.albumId)) {
        return photo_response.data;
      }
      else {
        return `Logged in user does not have access to Photo #${req.params.id}.`;
      }
    }
    else {
      return "This photo does not exist."
    }
  }

}
