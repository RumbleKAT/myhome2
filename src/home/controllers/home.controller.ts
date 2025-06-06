import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from '../services/home.service';
import { GetHomesDto } from '../dto/get-homes.dto';

@Controller('homes')
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @Get()
  async getHomes(@Query() query: GetHomesDto) {
    const { category, start, end } = query;
    return this.service.getHomes(category, start, end);
  }

  @Get('detail')
  async getDetail(@Query('category') category: string, @Query('houseManageNo') houseManageNo: string, @Query('pblancNo') pblancNo: string) {
    return this.service.getHomeDetail(category, Number(houseManageNo), Number(pblancNo));
  }

  @Get('rate')
  async getRate(@Query('houseManageNo') houseManageNo: string, @Query('houseSeCd') houseSeCd: string) {
    return this.service.getRateInfo(Number(houseManageNo), houseSeCd);
  }

  @Get('refresh')
  async refresh(@Query('category') category: string, @Query('start') start: string, @Query('end') end: string) {
    return { response: await this.service.refresh(category, start, end) };
  }
}
