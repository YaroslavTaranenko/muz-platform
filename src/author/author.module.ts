import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './author.schema';
import { Album } from '../album/album.schema';
import { Track } from '../track/track.schema';

@Module({
  imports: [SequelizeModule.forFeature([Author, Album, Track])],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
