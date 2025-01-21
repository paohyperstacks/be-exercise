import { IsEmail, IsInt, IsString, Length, Validate } from "class-validator";
import { isUnique } from "src/validation/is-unique";
import { IsUniqueConstraint } from "src/validation/is-unique-constraint";

export class OnboardingEnrollmentDto {

    @IsString()
    @Length(14, 14)
    accountNumber: string;

    @IsString()
    @isUnique({ tableName: 'onboarding', column: 'username'})
    username: string;

    @IsEmail()
    @isUnique({ tableName: 'onboarding', column: 'email'})
    email: string;

    @IsString()
    mobile: string;

    @IsString()
    password: string;

    @IsString()
    name: string;
}