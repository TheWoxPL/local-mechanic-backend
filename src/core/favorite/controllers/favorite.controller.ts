import {
  Body,
  Controller,
  Delete,
  HttpException,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { AppPermissions, Permissions } from '../../../libs';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FavoriteService } from '../services/favorite.service';
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
    @Res() res: Response,
    @Body('serviceId') serviceId: string
  ): Promise<Response> {
    try {
      await this.favoriteService.addToFavorites(
        serviceId,
        req.session.user!.id
      );
      return res
        .status(200)
        .json({ message: 'Service successfully added to favorite' });
    } catch (error) {
      if (error instanceof HttpException) {
        return res
          .status(error.getStatus())
          .json({ message: error.getResponse() });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Delete('remove-from-favorites')
  @ApiOperation({ summary: 'Remove from favorites' })
  @ApiResponse({
    status: 201,
    description: 'Removed from favorites',
    type: Favorite
  })
  async removeFromFavorites(
    @Req() req: Request,
    @Res() res: Response,
    @Body('serviceId') serviceId: string
  ): Promise<Response> {
    try {
      await this.favoriteService.removeFromFavorites(
        serviceId,
        req.session.user!.id
      );
      return res
        .status(200)
        .json({ message: 'Service successfully removed from favorites' });
    } catch (error) {
      if (error instanceof HttpException) {
        return res
          .status(error.getStatus())
          .json({ message: error.getResponse() });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  @ApiBearerAuth()
  @Permissions(AppPermissions.APP.DISPLAY)
  @Post('is-service-favorite')
  @ApiOperation({ summary: 'Check if service is favorite' })
  @ApiResponse({
    status: 200,
    description: 'Returns true if service is favorite, false otherwise',
    type: Boolean
  })
  async isServiceFavorite(
    @Req() req: Request,
    @Res() res: Response,
    @Body('serviceId') serviceId: string
  ): Promise<Response> {
    try {
      const isFavorite = await this.favoriteService.isServiceFavoriteByUserId(
        serviceId,
        req.session.user!.id
      );
      return res.status(200).json({ isFavorite });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
