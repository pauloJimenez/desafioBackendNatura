import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioERepositoriosGithubController } from '../../../src/user-and-repos/adapter/controller/usuario-repositorios-github.controler';
import { BuscaUsuarioERepositoriosService } from '../../../src/user-and-repos/domain/service/busca-usuario-repositorios.service';
import { ResponseUsuario } from '../../../src/user-and-repos/domain/model/response-usuario';

describe('UsuarioERepositoriosGithubController', () => {
  let controller: UsuarioERepositoriosGithubController;
  let service: BuscaUsuarioERepositoriosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioERepositoriosGithubController],
      providers: [
        {
          provide: BuscaUsuarioERepositoriosService,
          useValue: {
            buscarUsuarioERepositorios: jest
              .fn()
              .mockResolvedValue(new ResponseUsuario()),
          },
        },
      ],
    }).compile();

    controller = module.get<UsuarioERepositoriosGithubController>(
      UsuarioERepositoriosGithubController,
    );
    service = module.get<BuscaUsuarioERepositoriosService>(
      BuscaUsuarioERepositoriosService,
    );
  });

  it('Deve ser chamado o BuscaUsuarioERepositoriosService com username válido', async () => {
    const nomeUsuario = 'testUser';
    await controller.buscaUsuarioERepositorios(nomeUsuario);
    expect(service.buscarUsuarioERepositorios).toHaveBeenCalledWith(
      nomeUsuario,
    );
  });
});