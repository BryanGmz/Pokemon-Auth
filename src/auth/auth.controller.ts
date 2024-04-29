import { Body, Controller, Get, NotFoundException, Param, Post, SetMetadata, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { KeycloakService } from 'src/modules/keycloak/keycloak.service';

@Controller('auth')
export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly keycloakService: KeycloakService
    ) {}

    @Post('login')
    async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<any> {
      return this.authService.login(loginDto);
    }
  
    @Post('refresh-token')
    async refreshToken(@Body(ValidationPipe) refreshTokenDto: RefreshTokenDto): Promise<any> {
      return this.authService.refreshToken(refreshTokenDto);
    }

    // Endpoint de prueba restringido a usuarios con el rol "admin_client_role"
    @Get('restricted')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @SetMetadata('roles', ['admin_client_role']) // Establece el rol requerido
    async restrictedEndpoint() {
      return { message: 'This is a restricted endpoint accessible only to users with the role "admin_client_role".' };
    }

    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
      try {
        const user = await this.keycloakService.getUserByUsername(username);
        return user;
      } catch (error) {
        console.error('Error fetching user from Keycloak:', error);
        return new NotFoundException();
      }
    }
}
