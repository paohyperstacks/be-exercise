import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreateTransactionDto } from 'src/onboarding/dto/create-transaction.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  transactions(@Req() req, @Body() dto: CreateTransactionDto) {
    return this.paymentsService.transactions(req.user.id, dto);
  }
}
