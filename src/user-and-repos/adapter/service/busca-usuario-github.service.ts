import { Usuario } from 'src/user-and-repos/domain/model/usuario';
import { ApiUsuarioGithubRepository } from '../repository/api-usuario-github-repository';
import { BuscaUsuarioService } from 'src/user-and-repos/domain/interfaces/busca-usuario.service';

export class BuscaUsuarioGithubService implements BuscaUsuarioService {
  constructor(
    private readonly apiUsuarioGithubRepository: ApiUsuarioGithubRepository,
  ) {}

  mapearJSONParaUsuario(jsonUsuario: any): Usuario {
    const usuario = new Usuario();
    usuario.nome = jsonUsuario.name;
    usuario.urlAvatar = jsonUsuario.avatar_url;
    usuario.email = jsonUsuario.email;
    usuario.biografia = jsonUsuario.bio;
    usuario.quantidadeSeguidores = jsonUsuario.followers;
    usuario.quantidadeRepositorios = jsonUsuario.public_repos;
    return usuario;
  }

  async buscarUsuario(username: string): Promise<Usuario> {
    const usuario =
      await this.apiUsuarioGithubRepository.buscarUsuarioGithub(username);
    return this.mapearJSONParaUsuario(usuario);
  }
}
