import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import mongoose, { Model } from 'mongoose';
import { Favorite } from 'src/models';
import { FavoriteDTO } from '../dtos/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private favoriteModel: Model<Favorite>
  ) {}

  async addToFavorites(
    serviceId: string,
    userId: string
  ): Promise<FavoriteDTO> {
    const existingFavorite = await this.favoriteModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      serviceId: new mongoose.Types.ObjectId(serviceId)
    });

    if (existingFavorite) {
      throw new HttpException('This service is already in your favorites', 400);
    }
    const createFavoriteDoc = new this.favoriteModel();
    createFavoriteDoc.userId = userId;
    createFavoriteDoc.serviceId = serviceId;
    createFavoriteDoc.createdBy = userId;
    createFavoriteDoc.updatedBy = userId;

    const result = await createFavoriteDoc.save();
    return plainToClass(FavoriteDTO, result, {
      excludeExtraneousValues: true
    });
  }
}
