import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  getAll() {
    return this.authorService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.authorService.getOne(id);
  }
  @Post()
  create(@Body() dto: CreateAuthorDto) {
    return this.authorService.create(dto);
  }
  @Post(':id')
  update(@Param('id') id: number, @Body() dto: CreateAuthorDto) {
    return this.authorService.edit(id, dto);
  }
  @Get(':id')
  delete(@Param('id') id: number) {
    return this.authorService.delete(id);
  }
}
