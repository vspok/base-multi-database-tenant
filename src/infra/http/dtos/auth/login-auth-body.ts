import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
// import { ContactCustomFieldModel } from "src/domain/models/contact-custom-fields";

export class LoginAuthBody{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    password: string;
}
