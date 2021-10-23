import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Album } from './album.schema';

@Injectable()
export class AlbumService {
  constructor(@InjectModel(Album) private albumRepo: typeof Album) {}

  async getAll() {}

  async getOne(id) {}

  async create() {}

  async delete() {}
}
