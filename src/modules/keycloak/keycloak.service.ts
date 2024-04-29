import { Injectable } from '@nestjs/common';
import * as KeycloakAdminClient from 'keycloak-admin-client';

@Injectable()
export class KeycloakService {
  private keycloakClient: KeycloakAdminClient;

   constructor() {
     
   }

  // Métodos para interactuar con la API de administración de Keycloak
  // Ejemplo: obtener un usuario por su nombre de usuario
  async getUserByUsername(username: string) {
    try {
      const user = {
        username:  username,
        password: "password",
        tenatId: "tenatId2",
      };
      return user;
    } catch (error) {
      console.error('Error al obtener usuario por nombre de usuario:', error);
      throw error; // Re-lanza el error para que sea manejado en el código que llama a esta función
    }
  }

  // Otros métodos para crear usuarios, agregar atributos personalizados, etc.
}