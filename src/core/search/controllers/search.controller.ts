import { Controller, Get, Query, Req } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { SearchSuggestionDto } from '../dtos/search-suggestion.dto';
import { ServiceDTO } from 'src/core/service/dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AppPermissions, Permissions } from '../../../libs';
import { Service } from 'src/models/service.model';
import { Request } from 'express';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Get('suggestions')
  @ApiOperation({ summary: 'Get search suggestions based on input query' })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'The search query text'
  })
  @ApiResponse({
    status: 200,
    description: 'List of search suggestions matching the query',
    type: [SearchSuggestionDto]
  })
  async getSuggestions(
    @Query('query') query: string = ''
  ): Promise<SearchSuggestionDto[]> {
    return this.searchService.getSuggestions(query);
  }

  @Permissions(AppPermissions.APP.DISPLAY)
  @ApiBearerAuth()
  @Get('services')
  @ApiOperation({ summary: 'Search for services matching the query' })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'The service search query text'
  })
  @ApiResponse({
    status: 200,
    description: 'List of services matching the search query',
    type: [Service]
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async searchServices(
    @Query('query') query: string = '',
    @Req() req: Request
  ): Promise<ServiceDTO[]> {
    const userId = req.session.user!.id;
    return this.searchService.searchServices(query, userId);
  }
}
