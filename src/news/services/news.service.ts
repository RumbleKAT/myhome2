import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class NewsService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async getNews(keyword = '부동산') {
    const key = `news:${keyword}`;
    const cached = await this.cache.get(key);
    if (cached) return cached;

    const searchKeyword = encodeURIComponent(keyword);
    const url = `https://news.google.com/rss/search?q=${searchKeyword}&hl=ko&gl=KR&ceid=KR%3Ako`;
    const { data } = await axios.get(url);
    const $ = load(data, { xmlMode: true });
    const result = {
      title: $('channel > title').text(),
      description: $('channel > description').text(),
      link: $('channel > link').text(),
      items: $('channel > item')
        .map((_, el) => {
          const item = $(el);
          return {
            title: item.find('title').text(),
            link: item.find('link').text(),
            pubDate: item.find('pubDate').text(),
            creator: item.find('dc\\:creator').text(),
            content: item.find('content\\:encoded').text(),
            contentSnippet: item.find('description').text(),
          };
        })
        .get(),
    };
    await this.cache.set(key, result, 1000 * 60 * 60);
    return result;
  }
}
