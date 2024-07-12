import { Repositorio } from './repositorio';

export class Usuario {
  nome: string;
  urlAvatar: string;
  email: string;
  biografia: string;
  quantidadeSeguidores: number;
  quantidadeRepositorios: number;
  listaRepositorios: Repositorio[];
}
