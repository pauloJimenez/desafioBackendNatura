import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { url } from 'inspector';
import { Usuario } from 'src/user-and-repos/domain/model/usuario';

@Injectable()
export class ApiUserGithubRepository {
  @Inject('API_GITHUB_USER') url: string;
  async buscaUsuarioGithub(username: string): Promise<Usuario> {
    const response = await axios.get(`${url}/${username}`);
    return response.data;
  }
}
