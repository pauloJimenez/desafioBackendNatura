import { Repositorio } from './repositorio';

export class ResponseUsuario {
  nome: string;
  urlAvatar: string;
  email: string;
  biografia: string;
  quantidadeSeguidores: number;
  quantidadeRepositorios: number;
  listaRepositorios: Repositorio[];
}
