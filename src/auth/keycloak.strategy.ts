import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2-client-password';
import axios from 'axios';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const tokenEndpoint = process.env.KEYCLOAK_TOKEN_ENDPOINT;

    try {
      const response = await axios.post(tokenEndpoint, {
        grant_type: 'password',
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        username,
        password,
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch token');
    }
  }
}
