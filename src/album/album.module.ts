import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './album.schema';
import { Track } from '../track/track.schema';
import { Author } from '../author/author.schema';

@Module({
  imports: [SequelizeModule.forFeature([Album, Track, Author])],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
