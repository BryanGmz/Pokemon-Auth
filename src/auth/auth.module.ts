import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RoleGuard } from './guards/role.guard';
import { KeycloakModule } from 'src/modules/keycloak/keycloak.module';

@Module({
  imports: [
    PassportModule,
    KeycloakModule
    // JwtModule.register({
      // secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '1h' }, // Cambia según tus necesidades
    //}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RoleGuard],
})
export class AuthModule {}
