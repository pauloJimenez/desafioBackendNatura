import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { BuscaRepositoriosDeUsuarioGithubService } from '../../../../src/user-and-repos/adapter/service/busca-repositorios-usuario-github.service';
import { ApiUsuarioRepositoriosGithubRepository } from '../../../../src/user-and-repos/adapter/repository/api-usuario-repositorios-github-repository';
import { HttpService } from '@nestjs/axios';
import { asyncScheduler, scheduled } from 'rxjs';

describe('BuscaRepositoriosDeUsuarioGithubService', () => {
  let service: BuscaRepositoriosDeUsuarioGithubService;
  let httpService: HttpService;
  let repositorio: ApiUsuarioRepositoriosGithubRepository;
  let testingModule: TestingModule;
  const mockRepositorio = {
    data: [
      {
        name: 'nomeRepositorioTeste1',
        full_name: 'nomeCompletoRepositorioTeste1',
        html_url: 'urlRepositorioTeste1',
      },
      {
        name: 'nomeRepositorioTeste2',
        full_name: 'nomeCompletoRepositorioTeste2',
        html_url: 'urlRepositorioTeste2',
      },
    ],
  };
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        BuscaRepositoriosDeUsuarioGithubService,
        {
          provide: 'BuscaRepositoriosDeUsuarioGitHub',
          useClass: ApiUsuarioRepositoriosGithubRepository,
        },
        {
          provide: ApiUsuarioRepositoriosGithubRepository,
          useValue: {
            buscarRepositoriosDoUsuarioGithub: jest.fn(),
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
    service = testingModule.get<BuscaRepositoriosDeUsuarioGithubService>(
      BuscaRepositoriosDeUsuarioGithubService,
    );
    httpService = testingModule.get<HttpService>(HttpService);
    repositorio = testingModule.get<ApiUsuarioRepositoriosGithubRepository>(
      ApiUsuarioRepositoriosGithubRepository,
    );
  });

  afterEach(async () => {
    await testingModule.close();
  });

  it('Deve ser chamado a ApiUsuarioRepositoriosGithubRepository com username válido', async () => {
    const nomeUsuario = 'userNameTest';
    httpService.get = jest
      .fn()
      .mockReturnValue(scheduled([mockRepositorio], asyncScheduler));
    repositorio.buscarRepositoriosDoUsuarioGithub = jest
      .fn()
      .mockResolvedValue(mockRepositorio);
    const repositorios = await service.buscarRepositoriosDeUsuario(nomeUsuario);
    expect(repositorios[0].nome).toEqual('nomeRepositorioTeste1');
    expect(repositorios[0].nomeCompleto).toEqual(
      'nomeCompletoRepositorioTeste1',
    );
    expect(repositorios[0].url).toEqual('urlRepositorioTeste1');
  });
});
