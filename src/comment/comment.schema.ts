import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Track } from '../track/track.schema';

interface CreateCommentParams {
  username: string;
  text: string;
  track_id: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CreateCommentParams> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @ForeignKey(() => Track)
  @Column({ type: DataType.INTEGER })
  track_id: number;
}
