import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.schema';
import createCommentDto from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private commentRepo: typeof Comment) {}

  async create(dto: createCommentDto) {
    const comment = await this.commentRepo.create(dto);
    return comment;
  }
  async getAll(trackId: number) {
    const comments = await this.commentRepo.findAll({
      where: { track_id: trackId },
    });
    return comments;
  }
  async getOne(id: number) {
    try {
      const comment = await this.commentRepo.findOne({ where: { id } });
      if (comment === null) throw new HttpException('Comment not found', 404);
      return comment;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Get one comment error' };
    }
  }
  async update(id: number, text: string) {
    try {
      const comment = await this.commentRepo.findOne({ where: { id } });
      if (comment === null) throw new HttpException('Comment not found', 404);
      comment.text = text;
      await comment.save();
      return comment;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Get one comment error' };
    }
  }
  async delete(id: number) {
    try {
      const comment = await this.commentRepo.findOne({ where: { id } });
      if (comment === null) throw new HttpException('Comment not found', 404);
      await comment.destroy();
      return { success: true, message: `Comment ${id} was deleted` };
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Get one comment error' };
    }
  }
}
