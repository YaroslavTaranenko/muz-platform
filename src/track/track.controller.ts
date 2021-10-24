import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import CreateTrackDto from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private trackSrv: TrackService) {}
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;

    return this.trackSrv.create(dto, picture[0], audio[0]);
  }
  @Get()
  getAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.trackSrv.getAll(limit, page);
  }
  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackSrv.search(query);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateTrackDto) {
    return this.trackSrv.update(id, dto);
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.trackSrv.getOne(id);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.trackSrv.delete(id);
  }
}
