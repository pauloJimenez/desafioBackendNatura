import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { BuscaUsuarioGithubService } from '../../../../src/user-and-repos/adapter/service/busca-usuario-github.service';
import { ApiUsuarioGithubRepository } from '../../../../src/user-and-repos/adapter/repository/api-usuario-github-repository';
import { HttpService } from '@nestjs/axios';
import { asyncScheduler, scheduled } from 'rxjs';

describe('BuscaUsuarioGithubService', () => {
  let service: BuscaUsuarioGithubService;
  let httpService: HttpService;
  let repositorio: ApiUsuarioGithubRepository;
  let testingModule: TestingModule;
  const mockUsuario = {
    data: {
      name: 'nomeTeste',
      avatar_url: 'urlAvatarTeste',
      email: 'emailTeste',
      bio: 'biografiaTeste',
      followers: 10,
      public_repos: 5,
    },
  };
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        BuscaUsuarioGithubService,
        {
          provide: 'BuscaUsuarioGitHub',
          useClass: ApiUsuarioGithubRepository,
        },
        {
          provide: ApiUsuarioGithubRepository,
          useValue: {
            buscarUsuarioGithub: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: 'API_GITHUB_USER',
          useValue: 'http://localhost',
        },
      ],
    }).compile();
    service = testingModule.get<BuscaUsuarioGithubService>(
      BuscaUsuarioGithubService,
    );
    httpService = testingModule.get<HttpService>(HttpService);
    repositorio = testingModule.get<ApiUsuarioGithubRepository>(
      ApiUsuarioGithubRepository,
    );
  });

  afterEach(async () => {
    await testingModule.close();
  });

  it('Deve ser chamado a ApiUsuarioGithubRepository com username válido', async () => {
    const nomeUsuario = 'userNameTest';
    httpService.get = jest
      .fn()
      .mockReturnValue(scheduled([mockUsuario], asyncScheduler));
    repositorio.buscarUsuarioGithub = jest.fn().mockResolvedValue(mockUsuario);
    const usuario = await service.buscarUsuario(nomeUsuario);
    expect(usuario.nome).toEqual('nomeTeste');
    expect(usuario.urlAvatar).toEqual('urlAvatarTeste');
    expect(usuario.email).toEqual('emailTeste');
    expect(usuario.biografia).toEqual('biografiaTeste');
    expect(usuario.quantidadeSeguidores).toEqual(10);
    expect(usuario.quantidadeRepositorios).toEqual(5);
  });
});
