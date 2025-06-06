import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Home } from '../../domain/home.entity';
import { HomeDetail } from '../../domain/home-detail.entity';
import { HomeRate } from '../../domain/home-rate.entity';
import { HomeRepository } from '../repositories/home.repository';

@Injectable()
export class HomeService {
  constructor(
    @Inject('HomeRepository') private readonly repo: HomeRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async getHomes(category: string, start: string, end: string): Promise<Home[]> {
    const key = `homes:${category}:${start}:${end}`;
    const cached = await this.cache.get<Home[]>(key);
    if (cached) {
      return cached;
    }
    const homes = await this.repo.fetchHomes(category, start, end);
    await this.cache.set(key, homes, 1000 * 60 * 5);
    return homes;
  }

  async getHomeDetail(category: string, houseManageNo: number, pblancNo: number): Promise<HomeDetail[]> {
    const key = `detail:${houseManageNo}`;
    const cached = await this.cache.get<HomeDetail[]>(key);
    if (cached) return cached;
    const list = await this.repo.fetchHomeDetail(category, houseManageNo, pblancNo);
    await this.cache.set(key, list, 1000 * 60 * 60);
    return list;
  }

  async getRateInfo(houseManageNo: number, houseSeCd: string): Promise<HomeRate[]> {
    const key = `rate:${houseManageNo}`;
    const cached = await this.cache.get<HomeRate[]>(key);
    if (cached) return cached;
    const list = await this.repo.fetchRateInfo(houseManageNo, houseSeCd);
    await this.cache.set(key, list, 1000 * 60 * 60);
    return list;
  }

  async refresh(category: string, start: string, end: string) {
    const homes = await this.repo.fetchHomes(category, start, end);
    return homes.length ? 'completed' : 'failed';
  }
}
