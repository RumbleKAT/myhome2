import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class RateService {
  private hfUrl = 'https://www.hf.go.kr/ko/sub02/sub02_01_07_01.do';
  private stdUrl = 'https://www.bok.or.kr/portal/singl/baseRate/list.do?dataSeCd=01&menuNo=200643';

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async getRate() {
    const key = 'rate:get';
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const { data } = await axios.get(this.hfUrl);
    const $ = load(data);
    let period = '';
    $('.taR.font16.mgt30').each((_, elem) => {
      period = $(elem).text().trim();
    });
    const banks: string[][] = [];
    $('.tbl tbody').each((_, tbody) => {
      $(tbody)
        .find('tr')
        .each((_, tr) => {
          const row: string[] = [];
          $(tr)
            .find('td')
            .each((_, td) => {
              row.push($(td).text().trim());
            });
          banks.push(row);
        });
    });
    const bank = banks.map((b) => ({ name: b[0], rate: b[1], call: b[2] }));
    const result = { period, bank };
    await this.cache.set(key, result, 1000 * 60 * 60);
    return result;
  }

  async getStdRate() {
    const key = 'rate:std';
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const { data } = await axios.get(this.stdUrl);
    const $ = load(data);
    const tableRows = $('table.fixed tbody tr');
    const items: { date: string; rate: string }[] = [];
    tableRows.each((_, row) => {
      const rowData = $(row).find('td');
      const yy = $(rowData[0]).text().trim() + '년';
      const mmdd = $(rowData[1]).text().trim();
      items.push({ date: `${yy} ${mmdd}`, rate: $(rowData[2]).text().trim() });
    });
    const result = { items };
    await this.cache.set(key, result, 1000 * 60 * 60);
    return result;
  }
}
