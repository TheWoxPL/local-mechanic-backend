import { Body, Controller, Post, Req } from '@nestjs/common';
import { AppPermissions, Permissions } from '../../../libs';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteDTO } from '../dtos/favorite.dto';
import { Favorite } from 'src/models';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Post('add-to-favorites')
  @ApiOperation({ summary: 'Add to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Succesfully added to favorites',
    type: Favorite
  })
  async addToFavorites(
    @Req() req: Request,
    @Body('serviceId') serviceId: string
  ): Promise<FavoriteDTO> {
    const result = await this.favoriteService.addToFavorites(
      serviceId,
      req.session.user!.id
    );

    return result;
  }
}
