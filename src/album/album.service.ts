import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Album } from './album.schema';
import CreateAlbumDto from './dto/create-album.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album) private albumRepo: typeof Album,
    private fileSrv: FileService,
  ) {}

  async getAll() {
    const albums = await this.albumRepo.findAll();
    return albums;
  }

  async getOneById(id: number) {
    try {
      const album = await this.albumRepo.findOne({ where: { id } });
      return album;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || `get album by id error` };
    }
  }

  async create(dto: CreateAlbumDto, picture) {
    try {
      const picturePath = this.fileSrv.createFile(FileType.PICTURE, picture);
      const album = await this.albumRepo.create({ ...dto, picturePath });
      return album;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || `Create album error` };
    }
  }

  async update(id: number, name: string, picture) {
    try {
      const album = await this.albumRepo.findByPk(id);
      if (album === null) throw new HttpException('Album not found.', 404);
      album.name = name;
      this.fileSrv.removeFile(album.picture);
      album.picture = this.fileSrv.createFile(FileType.PICTURE, picture);
      await album.save();
      return album;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || `Create album error` };
    }
  }

  async delete(id: number) {
    try {
      const album = await this.albumRepo.findByPk(id);
      await album.destroy();
      return { success: true, message: `Album deleted.` };
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || `Create album error` };
    }
  }
}
