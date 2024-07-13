import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ApiUsuarioRepositoriosGithubRepository {
  constructor(
    @Inject('API_GITHUB_USER') private readonly url: string,
    private readonly httpService: HttpService,
  ) {}
  async buscarRepositoriosDoUsuarioGithub(username: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.url}/${username}/repos`),
    );
    return response.data;
  }
}
