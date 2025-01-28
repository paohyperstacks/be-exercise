import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Onboarding } from 'src/entities/onboarding.entity';
import { Repository } from 'typeorm';
import { OnboardingEnrollmentDto } from './dto/onboarding-enrollment.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { isEmail } from 'class-validator';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Onboarding)
    private onboardingRepository: Repository<Onboarding>,
  ) {}

  async cbsAccount(id: string): Promise<any> {
    try {
      const url = `https://randd.haibe.io/ms-rnd-dev-cbs/accounts/${id}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }

  async enrollment(body: OnboardingEnrollmentDto) {
    const { accountNumber } = body;
    const response = await this.cbsAccount(accountNumber);
    if (response.status === false) {
      throw new NotFoundException(response.message);
    }
    if (response.status !== 'ACTIVE') {
      throw new BadRequestException(`${accountNumber} is not Active.`);
    }

    const user = this.onboardingRepository.create(body);
    return await this.onboardingRepository.save(user);
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const { password, confirmPassword } = dto;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'Password and Confirm Password do not match',
      );
    }
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found.');

    user.password = password;
    await this.onboardingRepository.save(user);

    return { message: 'Password updated successfully.' };
  }

  async findByUserOrEmail(username: string) {
    const field = isEmail(username) ? 'email' : 'username';

    return await this.onboardingRepository.findOne({
      where: {
        [field]: username,
      },
    });
  }

  async findOne(id: string) {
    return this.onboardingRepository.findOne({
      where: { id },
    });
  }

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string) {
    return await this.onboardingRepository.update(
      { id: userId },
      { hashedRefreshToken },
    );
  }
}
