export interface Usuario {
    email: string;
    password: string;
  }
export interface UsuarioMod{
  
  id: number; // Necesario para identificar el usuario a actualizar
  name: string;
  email: string;
  password: string;
  telefono: string;
  active: boolean;
  confirmed_at: string;
  roleId: number; // Agrega esta propiedad
}

export interface UsuarioRegistro {
  name: string;
  email: string;
  password: string;
  telefono: string;
  active: boolean;
  confirmed_at: string;
  roleId: number;
}
