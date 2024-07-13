import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { UsuarioERepositoriosGithubController } from '../../../../src/user-and-repos/adapter/controller/usuario-repositorios-github.controler';
import { BuscaUsuarioERepositoriosService } from '../../../../src/user-and-repos/domain/service/busca-usuario-repositorios.service';
import { ResponseUsuario } from '../../../../src/user-and-repos/domain/model/response-usuario';

describe('UsuarioRepositoriosGithubController', () => {
  let controller: UsuarioERepositoriosGithubController;
  let service: BuscaUsuarioERepositoriosService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
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
    controller = testingModule.get<UsuarioERepositoriosGithubController>(
      UsuarioERepositoriosGithubController,
    );
    service = testingModule.get<BuscaUsuarioERepositoriosService>(
      BuscaUsuarioERepositoriosService,
    );
  });

  afterEach(async () => {
    await testingModule.close();
  });

  it('Deve ser chamado o BuscaUsuarioERepositoriosService com username válido', async () => {
    const nomeUsuario = 'userNameTest';
    await controller.buscaUsuarioERepositorios(nomeUsuario);
    expect(service.buscarUsuarioERepositorios).toHaveBeenCalledWith(
      nomeUsuario,
    );
  });
});
