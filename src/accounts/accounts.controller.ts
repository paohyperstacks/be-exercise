import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('inquiry')
  accountInquiry(@Req() req) {
    return this.accountsService.accountInquiry(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('transactions')
  accountTransactions(@Req() req) {
    return this.accountsService.accountTransactions(req.user.id)
  }

}
