import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { ApiUsuarioGithubRepository } from './adapter/repository/api-usuario-github-repository';
import { ApiUsuarioRepositoriosGithubRepository } from './adapter/repository/api-usuario-repositorios-github-repository';
import { BuscaUsuarioGithubService } from './adapter/service/busca-usuario-github.service';
import { BuscaRepositoriosDeUsuarioGithubService } from './adapter/service/busca-repositorios-usuario-github.service';
import { BuscaUsuarioERepositoriosService } from './domain/service/busca-usuario-repositorios.service';
dotenv.config();

@Module({
  imports: [HttpModule],
  providers: [
    BuscaUsuarioERepositoriosService,
    {
      provide: 'API_GITHUB_USER',
      useValue: process.env.API_GITHUB_USER,
    },
    {
      provide: 'BuscaUsuarioGitHub',
      useClass: ApiUsuarioGithubRepository,
    },
    {
      provide: 'BuscaRepositoriosDeUsuarioGitHub',
      useClass: ApiUsuarioRepositoriosGithubRepository,
    },
    { provide: 'BuscaUsuarioService', useClass: BuscaUsuarioGithubService },
    {
      provide: 'BuscaRepositoriosService',
      useClass: BuscaRepositoriosDeUsuarioGithubService,
    },
  ],
})
export class UserAndReposModule {}
