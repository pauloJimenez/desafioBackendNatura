import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { ApiUsuarioRepositoriosGithubRepository } from '../../../../src/user-and-repos/adapter/repository/api-usuario-repositorios-github-repository';
import { HttpService } from '@nestjs/axios';
import { asyncScheduler, scheduled } from 'rxjs';

describe('ApiUsuarioRepositoriosGithubRepository', () => {
  let repositorio: ApiUsuarioRepositoriosGithubRepository;
  let httpService: HttpService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ApiUsuarioRepositoriosGithubRepository,
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
    repositorio = testingModule.get<ApiUsuarioRepositoriosGithubRepository>(
      ApiUsuarioRepositoriosGithubRepository,
    );
    httpService = testingModule.get<HttpService>(HttpService);
  });

  afterEach(async () => {
    await testingModule.close();
  });

  it('Deve retornar a lista de repositórios de um nome de usuário válido', async () => {
    const mockData = {
      data: {
        name: 'nomeRepositorioTeste',
        full_name: 'nomeCompletoRepositorioTeste',
        html_url: 'urlRepositorioTeste',
      },
    };
    const userName = 'usuarioValido';
    httpService.get = jest
      .fn()
      .mockReturnValue(scheduled([mockData], asyncScheduler));
    const resultado =
      await repositorio.buscarRepositoriosDoUsuarioGithub(userName);
    expect(resultado.name).toEqual('nomeRepositorioTeste');
    expect(resultado.full_name).toEqual('nomeCompletoRepositorioTeste');
    expect(resultado.html_url).toEqual('urlRepositorioTeste');
  });
});
