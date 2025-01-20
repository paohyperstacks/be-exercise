import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OnboardingModule } from './onboarding/onboarding.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    OnboardingModule,
    TypeOrmModule.forRoot(pgConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
