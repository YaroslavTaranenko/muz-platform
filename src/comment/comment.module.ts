import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.schema';
import { Track } from '../track/track.schema';

@Module({
  imports: [SequelizeModule.forFeature([Comment, Track])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
