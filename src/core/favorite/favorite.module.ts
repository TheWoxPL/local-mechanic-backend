import { Module } from '@nestjs/common';
import { FavoriteService } from './services/favorite.service';
import { FavoriteController } from './controllers/favorite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }])
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController]
})
export class FavoriteModule {}
