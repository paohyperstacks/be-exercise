import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboarding } from 'src/entities/onboarding.entity';
import { OnboardingService } from 'src/onboarding/onboarding.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Onboarding]), HttpModule],
  controllers: [AccountsController],
  providers: [AccountsService, OnboardingService],
})
export class AccountsModule {}
