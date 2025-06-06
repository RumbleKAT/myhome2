import { Inject, Injectable } from '@nestjs/common';
import { GreetingRepository } from '../repositories/greeting.repository';

export interface GreetingService {
  getGreeting(): string;
}

@Injectable()
export class AppService implements GreetingService {
  constructor(
    @Inject('GreetingRepository') private readonly repo: GreetingRepository,
  ) {}

  getGreeting(): string {
    return this.repo.getGreeting();
  }
}
