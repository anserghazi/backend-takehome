import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';
import { HttpService } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [AuthModule, UsersModule, AlbumsModule, PhotosModule, HttpModule, Observable],
  controllers: [AppController, AlbumsController],
  providers: [AppService, AlbumsService],
})
export class AppModule {}
