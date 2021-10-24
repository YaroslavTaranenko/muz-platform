import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './album.schema';
import { Track } from '../track/track.schema';
import { Author } from '../author/author.schema';
import { FileModule } from '../file/file.module';
import { FileService } from '../file/file.service';

@Module({
  imports: [SequelizeModule.forFeature([Album, Track, Author]), FileModule],
  providers: [AlbumService, FileService],
  controllers: [AlbumController],
})
export class AlbumModule {}
