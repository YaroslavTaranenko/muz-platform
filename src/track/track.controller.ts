import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('track')
export class TrackController {
  @Post()
  create() {}
  @Get()
  getAll() {}
  @Get()
  getOne() {}
  @Delete()
  delete() {}
}
