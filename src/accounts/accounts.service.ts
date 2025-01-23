import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { OnboardingService } from 'src/onboarding/onboarding.service';

@Injectable()
export class AccountsService {
    constructor(private readonly httpService: HttpService, private onboardingService: OnboardingService) {}

    async accountInquiry(id: string) {
        const { accountNumber } = await this.onboardingService.findOne(id)

        const body = {
            "branchCode": accountNumber.slice(0,6),
            "account": accountNumber.slice(-8)
        }

        const response  = await this.getDetails(body, process.env.RANDD_URL + '/inquiry')
        const { balance, accountType } = response.data
        return {
            balance,
            accountType
        }
    }

    async accountTransactions(id: string){
        const { accountNumber } = await this.onboardingService.findOne(id)
        const body = {
            accountNumber,
            "sortDirection": "asc"
        }

        const response  = await this.getDetails(body, process.env.RANDD_URL + '/transactions')
        const formatData = response.data.result.map(({ source, destination, amount, transactionDescription, transactionDate }) => ({
            source,
            destination,
            amount,
            transactionDescription,
            transactionDate
        }))
        return formatData
        
    }

    async getDetails(body: Record<string, any>, url: string) {

        const headers = {
            'x-higala-username': process.env.HIGALA_USER,
            'x-higala-password': process.env.HIGALA_PASS
        }

        try {
            return await lastValueFrom(this.httpService.post(url, body, { headers}))
        } catch(error) {
            const errorMessage =  error.message;   
            throw new NotFoundException(errorMessage)
        }
        
    }

}
