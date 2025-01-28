import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @Length(14, 14)
  source: string;

  @IsString()
  @Length(14, 14)
  destination: string;

  @IsString()
  amount: string;

  @IsString()
  transactionDescription: string;
}
