import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { AuthorModule } from './author/author.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track/track.schema';
import { Comment } from './comment/comment.schema';
import { Album } from './album/album.schema';
import { Author } from './author/author.schema';
import { FileModule } from './file/file.module';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrackModule,
    AlbumModule,
    AuthorModule,
    CommentModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_BASE,
      models: [Track, Comment, Album, Author],
      autoLoadModels: true, // for auto creating tables based on model
    }),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
