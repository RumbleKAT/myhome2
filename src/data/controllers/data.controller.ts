import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DataService } from '../services/data.service';

@Controller('data')
export class DataController {
  constructor(private readonly service: DataService) {}

  @Post('document')
  async document(@Body('path') path: string) {
    const token = process.env.GITHUB_TOKEN || '';
    const owner = 'RumbleKAT';
    const repo = 'HomeApplyServer';
    return this.service.uploadDocument(path, token, owner, repo);
  }

  @Get('storage')
  async getStorage(@Query('filename') filename: string) {
    const token = process.env.GITHUB_TOKEN || '';
    const owner = 'RumbleKAT';
    const repo = 'HomeApplyServer';
    return this.service.getStorage(filename, token, owner, repo);
  }

  @Post('storage')
  async uploadStorage(@Body('path') path: string, @Body('data') data: any) {
    const token = process.env.GITHUB_TOKEN || '';
    const owner = 'RumbleKAT';
    const repo = 'HomeApplyServer';
    return this.service.uploadStorage(path, data, token, owner, repo);
  }
}
