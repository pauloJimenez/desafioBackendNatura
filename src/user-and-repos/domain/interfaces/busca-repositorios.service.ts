import { Repositorio } from '../model/repositorio';

export interface BuscaRepositoriosService {
  buscarRepositoriosDeUsuario(username: string): Promise<Repositorio[]>;
}