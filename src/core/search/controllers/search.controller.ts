import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { SearchSuggestionDto } from '../dtos/search-suggestion.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('suggestions')
  async getSuggestions(
    @Query('query') query: string = ''
  ): Promise<SearchSuggestionDto[]> {
    return this.searchService.getSuggestions(query);
  }
}
