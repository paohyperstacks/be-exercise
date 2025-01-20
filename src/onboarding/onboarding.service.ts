import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Onboarding } from 'src/entities/onboarding.entity';
import { Repository } from 'typeorm';
import { OnboardingEnrollmentDto } from './dto/onboarding-enrollment.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OnboardingService {

    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(Onboarding) private onboardingRepository: Repository<Onboarding>) {}

    async cbsAccount(id: string): Promise<any> {
        try {
            const url = `https://randd.haibe.io/ms-rnd-dev-cbs/accounts/${id}`;
            const response = await firstValueFrom(this.httpService.get(url));  
            return response.data;
          } catch (error) {
            const errorMessage =  error.message;   
            throw new NotFoundException(errorMessage)
          }
        
    }

    async enrollment(body: OnboardingEnrollmentDto) {
        const { accountNumber } = body
        const response = await this.cbsAccount(accountNumber)
        if(response.status === "ACTIVE"){
            return await this.onboardingRepository.save(body)   
        }
    }
}
