import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.schema';
import { Comment } from '../comment/comment.schema';
import { Author } from '../author/author.schema';
import { Album } from '../album/album.schema';
import { FileService } from 'src/file/file.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    FileModule,
    SequelizeModule.forFeature([Track, Comment, Author, Album]),
  ],
  providers: [TrackService, FileService],
  controllers: [TrackController],
})
export class TrackModule {}
