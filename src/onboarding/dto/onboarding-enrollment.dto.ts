import { IsEmail, IsInt, IsString, Length } from "class-validator";

export class OnboardingEnrollmentDto {

    @IsString()
    @Length(14, 14)
    accountNumber: string;

    @IsString()
    userName: string;

    @IsEmail()
    email: string;

    @IsString()
    mobile: string;

    @IsString()
    password: string;

    @IsString()
    name: string;
}