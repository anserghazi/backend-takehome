import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { Observable } from 'rxjs';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, HttpModule, Observable],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
