import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Home } from '../../domain/home.entity';
import { HomeRepository } from './home.repository';
import { HomeDetail } from '../../domain/home-detail.entity';
import { HomeRate } from '../../domain/home-rate.entity';

@Injectable()
export class ExternalHomeRepository implements HomeRepository {
  private serviceMap: Record<string, string> = {
    APT: 'getAPTLttotPblancDetail',
    NonApt: 'getUrbtyOfctlLttotPblancDetail',
    Remain: 'getRemndrLttotPblancDetail',
  };
  private detailMap: Record<string, string> = {
    APT: 'getAPTLttotPblancMdl',
    NonApt: 'getUrbtyOfctlLttotPblancMdl',
    Remain: 'getRemndrLttotPblancMdl',
  };
  private rateMap: Record<string, string> = {
    '01': 'getAPTLttotPblancCmpet',
    '02': 'getUrbtyOfctlLttotPblancCmpet',
    '03': 'getPblPvtRentLttotPblancCmpet',
    '04': 'getRemndrLttotPblancCmpet',
    '06': 'getCancResplLttotPblancCmpet',
    '10': 'getPblPvtRentLttotPblancCmpet',
  };

  async fetchHomes(category: string, start: string, end: string): Promise<Home[]> {
    const service = this.serviceMap[category];
    if (!service) return [];
    const host = process.env.API_HOST;
    const key = process.env.SERVICE_KEY;
    const url = `${host}/${service}?page=1&perPage=100&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${start}&cond%5BRCRIT_PBLANC_DE%3A%3ALTE%5D=${end}&serviceKey=${key}`;
    const res = await axios.get(url);
    const { data } = res.data;
    return data as Home[];
  }

  async fetchHomeDetail(category: string, houseManageNo: number, pblancNo: number): Promise<HomeDetail[]> {
    const service = this.detailMap[category];
    if (!service) return [];
    const host = process.env.API_HOST;
    const key = process.env.SERVICE_KEY;
    const url = `${host}/${service}?cond[HOUSE_MANAGE_NO::EQ]=${houseManageNo}&cond[PBLANC_NO::EQ]=${pblancNo}&serviceKey=${key}`;
    const res = await axios.get(url);
    const { data } = res.data;
    return data as HomeDetail[];
  }

  async fetchRateInfo(houseManageNo: number, houseSeCd: string): Promise<HomeRate[]> {
    const service = this.rateMap[houseSeCd];
    if (!service) return [];
    const host = process.env.RATE_HOST;
    const key = process.env.SERVICE_KEY;
    let url = `${host}/${service}?cond[HOUSE_MANAGE_NO::EQ]=${houseManageNo}&serviceKey=${key}`;
    const pageRes = await axios.get(url);
    const pageSize = pageRes.data.matchCount || 1;
    url = `${host}/${service}?page=1&perPage=${pageSize}&cond[HOUSE_MANAGE_NO::EQ]=${houseManageNo}&serviceKey=${key}`;
    const res = await axios.get(url);
    const { data } = res.data;
    return data as HomeRate[];
  }
}
