import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import CreateAlbumDto from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private albumSrv: AlbumService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
    const album = this.albumSrv.create(dto, files.picture[0]);
    return album;
  }

  @Get()
  getAll() {
    return this.albumSrv.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.albumSrv.getOneById(id);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  update(
    @UploadedFiles() files,
    @Body('name') name: string,
    @Param('id') id: number,
  ) {
    return this.albumSrv.update(id, name, files.picture[0]);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.albumSrv.delete(id);
  }
}
