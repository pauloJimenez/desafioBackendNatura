import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { ApiUserGithubRepository } from './adapter/repository/api-user-github-repository';
import { ApiUserReposGithubRepository } from './adapter/repository/api-user-repos-github-repository';
dotenv.config();

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'API_GITHUB_USER',
      useValue: process.env.API_GITHUB_USER,
    },
    {
      provide: 'API_GITHUB_REPOS',
      useValue: process.env.API_GITHUB_REPOS,
    },
    {
      provide: 'BuscaUsuarioGitHub',
      useClass: ApiUserGithubRepository,
    },
    {
      provide: 'BuscaRepositoriosDeUsuarioGitHub',
      useClass: ApiUserReposGithubRepository,
    },
  ],
})
export class UserAndReposModule {}
