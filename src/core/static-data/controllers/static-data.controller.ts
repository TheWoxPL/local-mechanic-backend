import { Controller, Get } from '@nestjs/common';
import { CurrencyDTO } from '../dtos/currency.dto';
import { StaticDataService } from '../services/static-data.service';
import { ServiceUnitDTO } from '../dtos/service-unit.dto';

@Controller('static-data')
export class StaticDataController {
  constructor(private readonly staticDataService: StaticDataService) {}

  @Get('get-currencies')
  async getCurrencies(): Promise<CurrencyDTO[]> {
    const result = await this.staticDataService.findAllCurrencies();
    return result;
  }
  @Get('get-service-units')
  async getServiceUnits(): Promise<ServiceUnitDTO[]> {
    const result = await this.staticDataService.findAllServiceUnits();
    return result;
  }
}
