import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Author } from '../author/author.schema';
import { Album } from '../album/album.schema';
import { Comment } from '../comment/comment.schema';
interface TrackCreateParams {
  name: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  artist_id: number;
  album_id?: number;
}

@Table({ tableName: 'tracks' })
export class Track extends Model<Track, TrackCreateParams> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  text: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  lisstens: number;

  @Column({ type: DataType.STRING, allowNull: true })
  picture: string;

  @Column({ type: DataType.STRING, allowNull: false })
  audio: string;

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER })
  artist_id: number;

  @ForeignKey(() => Album)
  @Column({ type: DataType.INTEGER })
  album_id: number;

  @HasMany(() => Comment)
  comments: Comment[];
}
