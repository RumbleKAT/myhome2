export interface GreetingRepository {
  getGreeting(): string;
}

export class AppRepository implements GreetingRepository {
  private cache = new Map<string, string>();

  getGreeting(): string {
    const key = 'greeting';
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    const value = 'Hello from repository!';
    this.cache.set(key, value);
    return value;
  }
}
