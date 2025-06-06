import { Home } from '../../domain/home.entity';
import { HomeDetail } from '../../domain/home-detail.entity';
import { HomeRate } from '../../domain/home-rate.entity';

export interface HomeRepository {
  fetchHomes(category: string, start: string, end: string): Promise<Home[]>;
  fetchHomeDetail(category: string, houseManageNo: number, pblancNo: number): Promise<HomeDetail[]>;
  fetchRateInfo(houseManageNo: number, houseSeCd: string): Promise<HomeRate[]>;
}
