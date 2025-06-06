import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from '../../home/services/home.service';
import * as moment from 'moment';

@Controller('report')
export class ReportController {
  constructor(private readonly homeService: HomeService) {}

  @Get('weekly')
  async getWeekly(@Query('category') category = 'APT') {
    const start = moment().startOf('week').format('YYYY-MM-DD');
    const end = moment().endOf('week').add(1, 'day').format('YYYY-MM-DD');
    const list = await this.homeService.getHomes(category, start, end);
    const htmlList =
      '<ul>' +
      list
        .map((item: any) => {
          const date = item.RCEPT_BGNDE || item.SUBSCRPT_RCEPT_BGNDE;
          return `<li>${item.HOUSE_NM} - ${moment(date).format('YYYY-MM-DD')}</li>`;
        })
        .join('') +
      '</ul>';
    return htmlList;
  }
}
