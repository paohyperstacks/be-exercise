import { Body, Controller, Get, HttpCode, Patch, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OnboardingEnrollmentDto } from './dto/onboarding-enrollment.dto';
import { OnboardingService } from './onboarding.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';

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

    @UseGuards(JwtAuthGuard)
    @Patch("change-password") 
    updatePassword(@Request() req, @Body() body: UpdatePasswordDto ) {
        return this.onboardingService.update(req.user.id, body)
    }
}
 