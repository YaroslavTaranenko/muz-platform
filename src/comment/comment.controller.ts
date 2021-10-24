import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import createCommentDto from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentSrv: CommentService) {}

  @Get()
  getAll() {
    return this.commentSrv.getAll();
  }

  @Post()
  create(@Body() dto: createCommentDto) {
    return this.commentSrv.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('text') text: string) {
    return this.commentSrv.update(id, text);
  }
}
