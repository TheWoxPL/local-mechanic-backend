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
      return res.status(200).json({ message: 'Service successfully removed' });
    } catch (error) {
      if (error instanceof HttpException) {
        return res
          .status(error.getStatus())
          .json({ message: error.getResponse() });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
