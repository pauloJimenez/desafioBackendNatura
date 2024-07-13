import { TestingModule } from '@nestjs/testing/testing-module';
import { Test } from '@nestjs/testing';
import { BuscaUsuarioERepositoriosService } from '../../../../src/user-and-repos/domain/service/busca-usuario-repositorios.service';
import { Usuario } from 'src/user-and-repos/domain/model/usuario';
import { Repositorio } from 'src/user-and-repos/domain/model/repositorio';

describe('BuscaUsuarioERepositoriosService', () => {
  let service: BuscaUsuarioERepositoriosService;
  let testingModule: TestingModule;
  const mockBuscaUsuarioService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async buscarUsuario(username: string): Promise<Usuario> {
      return {
        nome: 'nomeTeste',
        urlAvatar: 'urlAvatarTeste',
        email: 'emailTeste',
        biografia: 'biografiaTeste',
        quantidadeSeguidores: 10,
        quantidadeRepositorios: 5,
        listaRepositorios: [],
      };
    },
  };
  const mockBuscaRepositoriosService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async buscarRepositoriosDeUsuario(
      username: string,
    ): Promise<Repositorio[]> {
      return [
        {
          nome: 'nomeRepositorioTeste1',
          nomeCompleto: 'nomeCompletoRepositorioTeste1',
          url: 'urlRepositorioTeste1',
        },
        {
          nome: 'nomeRepositorioTeste2',
          nomeCompleto: 'nomeCompletoRepositorioTeste2',
          url: 'urlRepositorioTeste2',
        },
      ];
    },
  };
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        BuscaUsuarioERepositoriosService,
        {
          provide: 'BuscaUsuarioService',
          useFactory: () => mockBuscaUsuarioService,
        },
        {
          provide: 'BuscaRepositoriosService',
          useFactory: () => mockBuscaRepositoriosService,
        },
      ],
    }).compile();
    service = testingModule.get<BuscaUsuarioERepositoriosService>(
      BuscaUsuarioERepositoriosService,
    );
  });

  afterEach(async () => {
    await testingModule.close();
  });

  it('Deve ser chamado o metódo buscarUsuarioERepositorios com username válido', async () => {
    const nomeUsuario = 'userNameTest';
    const usuarioERepositorio =
      await service.buscarUsuarioERepositorios(nomeUsuario);
    expect(usuarioERepositorio.nome).toEqual('nomeTeste');
    expect(usuarioERepositorio.urlAvatar).toEqual('urlAvatarTeste');
    expect(usuarioERepositorio.email).toEqual('emailTeste');
    expect(usuarioERepositorio.biografia).toEqual('biografiaTeste');
    expect(usuarioERepositorio.quantidadeSeguidores).toEqual(10);
    expect(usuarioERepositorio.quantidadeRepositorios).toEqual(5);
    expect(usuarioERepositorio.listaRepositorios[0].nome).toEqual(
      'nomeRepositorioTeste1',
    );
    expect(usuarioERepositorio.listaRepositorios[0].nomeCompleto).toEqual(
      'nomeCompletoRepositorioTeste1',
    );
    expect(usuarioERepositorio.listaRepositorios[0].url).toEqual(
      'urlRepositorioTeste1',
    );
  });
});
