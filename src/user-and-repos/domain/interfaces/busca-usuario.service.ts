import { Usuario } from '../model/usuario';

export interface BuscaUsuarioService {
  buscarUsuario(username: string): Promise<Usuario>;
}
