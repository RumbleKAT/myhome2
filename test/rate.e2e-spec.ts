import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RateModule } from '../src/rate/rate.module';
import { RateService } from '../src/rate/services/rate.service';

describe('RateController (e2e)', () => {
  let app: INestApplication;
  const mockService = {
    getRate: jest.fn().mockResolvedValue({ period: '2024', bank: [] }),
    getStdRate: jest.fn().mockResolvedValue({ items: [] }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RateModule],
    })
      .overrideProvider(RateService)
      .useValue(mockService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/rate/getRate (GET)', () => {
    return request(app.getHttpServer())
      .get('/rate/getRate')
      .expect(200)
      .expect({ period: '2024', bank: [] });
  });
});
