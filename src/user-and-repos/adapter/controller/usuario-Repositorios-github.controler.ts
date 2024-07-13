import { Controller, Get, Param } from '@nestjs/common';
import { ResponseUsuario } from 'src/user-and-repos/domain/model/response-usuario';
import { BuscaUsuarioERepositoriosService } from '../../domain/service/busca-usuario-repositorios.service';

@Controller('usuario-github')
export class UsuarioERepositoriosGithubController {
  constructor(
    private readonly buscaUsuarioERepositoriosService: BuscaUsuarioERepositoriosService,
  ) {}

  @Get(':nomeUsuario')
  async buscaUsuarioERepositorios(
    @Param('nomeUsuario') nomeUsuario: string,
  ): Promise<ResponseUsuario> {
    return await this.buscaUsuarioERepositoriosService.buscarUsuarioERepositorios(
      nomeUsuario,
    );
  }
}
