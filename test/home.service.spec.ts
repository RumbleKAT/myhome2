import { HomeService } from '../src/home/services/home.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test } from '@nestjs/testing';

const mockRepo = {
  fetchHomes: jest.fn(),
  fetchHomeDetail: jest.fn(),
  fetchRateInfo: jest.fn(),
};

const cache = {
  get: jest.fn(),
  set: jest.fn(),
} as any;

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        HomeService,
        { provide: 'HomeRepository', useValue: mockRepo },
        { provide: CACHE_MANAGER, useValue: cache },
      ],
    }).compile();
    service = module.get(HomeService);
    Object.values(mockRepo).forEach((fn) => fn.mockReset());
    cache.get.mockReset();
    cache.set.mockReset();
  });

  it('caches getHomes', async () => {
    mockRepo.fetchHomes.mockResolvedValue([{ HOUSE_NM: 'test' }] as any);
    const result = await service.getHomes('APT', '2024-01-01', '2024-01-31');
    expect(result.length).toBe(1);
    expect(cache.set).toHaveBeenCalled();
    cache.get.mockResolvedValue(result);
    const cached = await service.getHomes('APT', '2024-01-01', '2024-01-31');
    expect(cached).toEqual(result);
    expect(mockRepo.fetchHomes).toHaveBeenCalledTimes(1);
  });
});
