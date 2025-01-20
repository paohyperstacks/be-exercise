import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OnboardingEnrollmentDto } from './dto/onboarding-enrollment.dto';
import { OnboardingService } from './onboarding.service';

@Controller('onboarding/enrollment')
export class OnboardingController {

    constructor(private onboardingService: OnboardingService) {}

    @Get()
    find() {
        return 'test';
    }

    @Post()
    @HttpCode(201)
    // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    enrollment(@Body() body: OnboardingEnrollmentDto) {
        return this.onboardingService.enrollment(body)
    }
}
 