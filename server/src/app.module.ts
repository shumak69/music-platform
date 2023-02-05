import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.aqulk4l.mongodb.net/?retryWrites=true&w=majority',
    ),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
