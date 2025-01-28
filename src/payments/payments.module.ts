import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { OnboardingService } from 'src/onboarding/onboarding.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboarding } from 'src/entities/onboarding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Onboarding]), HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, OnboardingService],
})
export class PaymentsModule {}
