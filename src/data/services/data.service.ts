import { Injectable } from '@nestjs/common';
import { UploadDTO, uploadJsonToGitHub, getJsonFromGitHub, deleteJsonFromGitHub } from '../../utils/github-store';
import axios from 'axios';

@Injectable()
export class DataService {
  async fetchDocument(path: string): Promise<any> {
    let fetchUrl = '';
    if (path === 'StdRate.json') {
      fetchUrl = `${process.env.BASE_URL}/rate/getStdRate`;
    } else if (path === 'Rate.json') {
      fetchUrl = `${process.env.BASE_URL}/rate/getRate`;
    } else {
      return { message: 'Not Found' };
    }
    const res = await axios.get(fetchUrl);
    return res.data;
  }

  async uploadDocument(path: string, token: string, owner: string, repo: string) {
    const data = await this.fetchDocument(path);
    const uploadDto: UploadDTO = { owner, repo, path, data, token };
    await uploadJsonToGitHub(uploadDto);
    return data;
  }

  async uploadStorage(path: string, data: any, token: string, owner: string, repo: string) {
    const dto: UploadDTO = { owner, repo, path, data, token };
    return uploadJsonToGitHub(dto);
  }

  async getStorage(filename: string, token: string, owner: string, repo: string) {
    const dto: UploadDTO = { owner, repo, path: filename, token };
    return getJsonFromGitHub(dto);
  }
}
