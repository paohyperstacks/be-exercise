import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OnboardingModule } from './onboarding/onboarding.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from './validation/is-unique-constraint';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [dbConfig]
    }), 
    OnboardingModule,
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    AuthModule,
    AccountsModule
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
