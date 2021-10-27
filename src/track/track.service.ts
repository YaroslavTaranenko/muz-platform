import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CreateTrackDto from './dto/create-track.dto';
import { Track } from './track.schema';
import { FileService, FileType } from '../file/file.service';
import { Op } from 'sequelize';
import { Author } from '../author/author.schema';
import { Album } from '../album/album.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track) private trackRepo: typeof Track,
    private fileSrv: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture: File, audio: File) {
    try {
      const audioPath = this.fileSrv.createFile(FileType.AUDIO, audio);
      const picturePath = this.fileSrv.createFile(FileType.PICTURE, picture);
      const track = await this.trackRepo.create({
        ...dto,
        listens: 0,
        audio: audioPath,
        picture: picturePath,
      });
      return track;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Create track error.' };
    }
  }
  async getAll(limit: number = 10, page: number = 1) {
    let offset = limit * page - limit;
    const tracks = await this.trackRepo.findAndCountAll({
      limit,
      offset,
      include: [
        { model: Album, attributes: ['name'] },
        { model: Author, attributes: ['name'] },
      ],
    });

    return tracks;
  }
  async update(id: number, dto: CreateTrackDto) {
    try {
      const track = await this.trackRepo.findOne({ where: { id } });
      if (track === null) throw new HttpException('Track not found.', 404);
      track.name = dto.name;
      track.text = dto.text;
      track.album_id = dto.album_id;
      await track.save();
      return track;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Update track error.' };
    }
  }
  async getOne(id: number) {
    try {
      const track = await this.trackRepo.findOne({ where: { id } });
      if (track === null) throw new HttpException('Track not found.', 404);
      track.lisstens += 1;
      await track.save();
      return track;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Get one track error.' };
    }
  }
  async delete(id: number) {
    try {
      const track = await this.trackRepo.findOne({ where: { id } });
      if (track === null) throw new HttpException('Track not found.', 404);
      track.destroy();
      return { success: true, message: `Track removed.` };
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Get one track error.' };
    }
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackRepo.findAll({
      where: {
        name: { [Op.regexp]: `*(${query})*` },
      },
    });
    return tracks;
  }
}
