import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import axios from 'axios';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import querystring from 'querystring'; // Importa la librería querystring

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto): Promise<any> {
    const tokenEndpoint = process.env.KEYCLOAK_TOKEN_ENDPOINT;

    try {
      const formData = new URLSearchParams(); // Crear un objeto URLSearchParams

      formData.append('grant_type', 'password');
      formData.append('client_id', process.env.KEYCLOAK_CLIENT_ID);
      formData.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET);
      formData.append('username', loginDto.username);
      formData.append('password', loginDto.password);

      const response = await axios.post(tokenEndpoint, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch token');
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<any> {
    const tokenEndpoint = process.env.KEYCLOAK_TOKEN_ENDPOINT;

    try {
      const formData = new URLSearchParams(); // Crear un objeto URLSearchParams

      formData.append('grant_type', 'refresh_token');
      formData.append('client_id', process.env.KEYCLOAK_CLIENT_ID);
      formData.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET);
      formData.append('refresh_token', refreshTokenDto.refreshToken);

      const response = await axios.post(tokenEndpoint, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }
}
