import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Album } from '../album/album.schema';
import { Track } from '../track/track.schema';

interface AuthorCreateParams {
  name: string;
}

@Table({ tableName: 'authors' })
export class Author extends Model<Author, AuthorCreateParams> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Album)
  albums: Album[];

  @HasMany(() => Track)
  tracks: Track[];
}
