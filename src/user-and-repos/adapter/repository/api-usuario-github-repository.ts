import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { url } from 'inspector';

@Injectable()
export class ApiUsuarioGithubRepository {
  @Inject('API_GITHUB_USER') url: string;
  async buscarUsuarioGithub(username: string): Promise<any> {
    const response = await axios.get(`${url}/${username}`);
    return response.data;
  }
}
