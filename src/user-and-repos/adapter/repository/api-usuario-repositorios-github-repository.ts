import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { url } from 'inspector';

@Injectable()
export class ApiUsuarioRepositoriosGithubRepository {
  @Inject('API_GITHUB_USER') url: string;
  async buscarRepositoriosDoUsuarioGithub(username: string): Promise<any> {
    const response = await axios.get(`${url}/${username}/repos`);
    return response.data;
  }
}
