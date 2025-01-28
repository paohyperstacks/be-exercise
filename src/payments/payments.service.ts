import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CreateTransactionDto } from 'src/onboarding/dto/create-transaction.dto';
import { OnboardingService } from 'src/onboarding/onboarding.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly httpService: HttpService,
    private onboardingService: OnboardingService,
  ) {}

  async transactions(id: string, dto: CreateTransactionDto) {
    const account = await this.onboardingService.findOne(id);
    const source = await this.onboardingService.cbsAccount(dto.source);
    const destination = await this.onboardingService.cbsAccount(
      dto.destination,
    );
    if (source.status === false)
      throw new BadRequestException(`Source ${source.message}`);
    if (destination.status === false)
      throw new BadRequestException(`Destination ${destination.message}`);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];

    const constantBody = {
      fee: '0',
      amountType: 'add',
      transactionType: 'TRANSFER-SEND',
      transactionDate: formattedDate,
      transactionReferrenceNumber: '123',
      transactionChannel: 'INSTAPAY',
      transactionBankBic: '123',
      transactionCode: '111',
    };

    const body = { ...dto, ...constantBody };
    return await this.transfer(body);
  }

  async transfer(body: any) {
    const headers = {
      'x-higala-username': process.env.HIGALA_USER,
      'x-higala-password': process.env.HIGALA_PASS,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'https://randd.haibe.io/ms-rnd-dev-cbs/transactions',
          body,
          { headers },
        ),
      );
    } catch (error) {
      return error.response.data;
    }
  }
}
