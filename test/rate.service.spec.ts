import { RateService } from '../src/rate/services/rate.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test } from '@nestjs/testing';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RateService', () => {
  let service: RateService;
  const cache = {
    get: jest.fn(),
    set: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RateService, { provide: CACHE_MANAGER, useValue: cache }],
    }).compile();
    service = module.get(RateService);
    mockedAxios.get.mockReset();
    cache.get.mockReset();
    cache.set.mockReset();
  });

  it('should fetch and cache rate', async () => {
    const data = '<div class="tbl"><tbody><tr><td>Bank</td><td>1%</td><td>call</td></tr></tbody></div><div class="taR font16 mgt30">2024.01</div>';
    mockedAxios.get.mockResolvedValue({ data });
    const result = await service.getRate();
    expect(result).toBeDefined();
    expect(cache.set).toHaveBeenCalled();
    // second call uses cache
    cache.get.mockResolvedValue(result);
    const cached = await service.getRate();
    expect(cached).toEqual(result);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
