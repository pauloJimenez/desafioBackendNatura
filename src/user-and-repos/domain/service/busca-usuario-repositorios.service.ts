import { Inject, Injectable } from '@nestjs/common';
import { BuscaRepositoriosService } from '../interfaces/busca-repositorios.service';
import { BuscaUsuarioService } from '../interfaces/busca-usuario.service';
import { Repositorio } from '../model/repositorio';
import { ResponseUsuario } from '../model/response-usuario';
import { Usuario } from '../model/usuario';

@Injectable()
export class BuscaUsuarioERepositoriosService {
  constructor(
    @Inject('BuscaUsuarioService')
    private readonly buscaUsuarioService: BuscaUsuarioService,
    @Inject('BuscaRepositoriosService')
    private readonly buscaRepositoriosService: BuscaRepositoriosService,
  ) {}

  mapearParaResponseUsuario(
    usuario: Usuario,
    repositorios: Repositorio[],
  ): ResponseUsuario {
    let responseUsuario = new ResponseUsuario();
    responseUsuario = {
      nome: usuario.nome,
      urlAvatar: usuario.urlAvatar,
      email: usuario.email,
      biografia: usuario.biografia,
      quantidadeSeguidores: usuario.quantidadeSeguidores,
      quantidadeRepositorios: usuario.quantidadeRepositorios,
      listaRepositorios: repositorios,
    };
    return responseUsuario;
  }

  async buscarUsuarioERepositorios(username: string): Promise<ResponseUsuario> {
    const usuario = await this.buscaUsuarioService.buscarUsuario(username);
    const repositorios =
      await this.buscaRepositoriosService.buscarRepositoriosDeUsuario(username);
    return this.mapearParaResponseUsuario(usuario, repositorios);
  }
}
