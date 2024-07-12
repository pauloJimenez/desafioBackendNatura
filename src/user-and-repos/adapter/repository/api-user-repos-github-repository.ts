import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { url } from 'inspector';
import { Usuario } from 'src/user-and-repos/domain/model/usuario';

@Injectable()
export class ApiUserReposGithubRepository {
  @Inject('API_GITHUB_USER') url: string;
  async buscaRepositoriosDoUsuarioGithub(username: string): Promise<Usuario> {
    const response = await axios.get(`${url}/${username}/repos`);
    return response.data;
  }
}
