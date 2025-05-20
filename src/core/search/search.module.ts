import { Module } from '@nestjs/common';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from 'src/models/service.model';
import { Company, CompanySchema } from 'src/models/company.model';
import { FavoriteModule } from 'src/core/favorite/favorite.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: Company.name, schema: CompanySchema }
    ]),
    FavoriteModule
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule {}
