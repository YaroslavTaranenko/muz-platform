import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Author } from '../author/author.schema';
import { Track } from '../track/track.schema';
interface AlbumCreateParams {
  name: string;
  authors_id: number;
  picturePath: string;
}

@Table({ tableName: 'albums' })
export class Album extends Model<Album, AlbumCreateParams> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  picture: string;

  @BelongsTo(() => Author)
  author: Author;

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authors_id: string;

  @HasMany(() => Track)
  tracks: Track[];
}
