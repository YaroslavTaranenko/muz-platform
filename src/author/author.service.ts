import { HttpException, Injectable } from '@nestjs/common';
import { getConnectionPrefix, InjectModel } from '@nestjs/sequelize';
import { Author } from './author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author) private authorRepo: typeof Author) {}
  async getAll() {
    const authors = await this.authorRepo.findAll();
    return authors;
  }
  async getOne(id: number) {
    try {
      const author = await this.authorRepo.findByPk(id);
      return author;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Get one author error.' };
    }
  }
  async create(dto: CreateAuthorDto) {
    return this.authorRepo.create(dto);
  }
  async edit(id: number, values: CreateAuthorDto) {
    try {
      const author = await this.authorRepo.findByPk(id);
      if (author === null) throw new HttpException('Author not found', 404);
      author.name = values.name;
      await author.save();
      return author;
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Author update error.' };
    }
  }
  async delete(id: number) {
    try {
      const author = await this.authorRepo.findByPk(id);
      if (author === null) throw new HttpException('Author not found', 404);
      await author.destroy();
      return { success: true, message: `Author ${id} was deleted` };
    } catch (e) {
      console.log(e);
      return { success: false, message: e.message || 'Author update error.' };
    }
  }
}
