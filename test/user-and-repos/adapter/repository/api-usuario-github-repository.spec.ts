import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { ApiUsuarioGithubRepository } from '../../../../src/user-and-repos/adapter/repository/api-usuario-github-repository';
import { HttpService } from '@nestjs/axios';
import { asyncScheduler, scheduled, throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('ApiUsuarioGithubRepository', () => {
  let repositorio: ApiUsuarioGithubRepository;
  let httpService: HttpService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ApiUsuarioGithubRepository,
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
    repositorio = testingModule.get<ApiUsuarioGithubRepository>(
      ApiUsuarioGithubRepository,
    );
    httpService = testingModule.get<HttpService>(HttpService);
  });

  afterEach(async () => {
    await testingModule.close();
  });

  it('Deve retornar dados do usuário para nome de usuário válido', async () => {
    const mockData = {
      data: {
        name: 'nomeTeste',
        avatar_url: 'urlAvatarTeste',
        email: 'emailTeste',
        bio: 'biografiaTeste',
        followers: 10,
        public_repos: 5,
      },
    };
    const userName = 'usuarioValido';
    httpService.get = jest
      .fn()
      .mockReturnValue(scheduled([mockData], asyncScheduler));
    const resultado = await repositorio.buscarUsuarioGithub(userName);
    expect(resultado.name).toEqual('nomeTeste');
    expect(resultado.avatar_url).toEqual('urlAvatarTeste');
    expect(resultado.email).toEqual('emailTeste');
    expect(resultado.bio).toEqual('biografiaTeste');
    expect(resultado.followers).toEqual(10);
    expect(resultado.public_repos).toEqual(5);
  });

  it('Deve lançar NotFoundException para um usuário inválido', async () => {
    const userName = 'usuarioInvalido';
    httpService.get = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Usuário não encontrado')));
    await expect(repositorio.buscarUsuarioGithub(userName)).rejects.toThrow(
      NotFoundException,
    );
  });
});
