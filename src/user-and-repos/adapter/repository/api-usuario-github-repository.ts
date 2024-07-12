import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
@Injectable()
export class ApiUsuarioGithubRepository {
  constructor(
    @Inject('API_GITHUB_USER') private readonly url: string,
    private readonly httpService: HttpService,
  ) {}
  async buscarUsuarioGithub(username: string): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.url}/${username}`).pipe(
        catchError((error: AxiosError) => {
          throw new NotFoundException(error.response.data);
        }),
      ),
    );
    return response.data;
  }
}
