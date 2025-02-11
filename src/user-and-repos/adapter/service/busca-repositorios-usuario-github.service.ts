import { Repositorio } from '../../domain/model/repositorio';
import { ApiUsuarioRepositoriosGithubRepository } from '../repository/api-usuario-repositorios-github-repository';
import { BuscaRepositoriosService } from 'src/user-and-repos/domain/interfaces/busca-repositorios.service';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class BuscaRepositoriosDeUsuarioGithubService
  implements BuscaRepositoriosService
{
  constructor(
    @Inject('BuscaRepositoriosDeUsuarioGitHub')
    private readonly apiUsuarioRepositoriosGithubRepository: ApiUsuarioRepositoriosGithubRepository,
  ) {}

  mapearJSONParaRepositorios(jsonRepositorios: any[]): Repositorio[] {
    return jsonRepositorios.map((jsonRepositorio: any) => {
      const repositorio = new Repositorio();
      repositorio.nome = jsonRepositorio.name;
      repositorio.nomeCompleto = jsonRepositorio.full_name;
      repositorio.url = jsonRepositorio.html_url;
      return repositorio;
    });
  }

  async buscarRepositoriosDeUsuario(username: string): Promise<Repositorio[]> {
    const repositorios =
      await this.apiUsuarioRepositoriosGithubRepository.buscarRepositoriosDoUsuarioGithub(
        username,
      );
    return this.mapearJSONParaRepositorios(repositorios);
  }
}
