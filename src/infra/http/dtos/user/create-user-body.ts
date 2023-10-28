import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    tokenVersion: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    profile: string;
    
    @ApiProperty({ required: false })
    @IsOptional()
    canReadMessage: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    sla: string;

    @ApiProperty({ required: false })
    @IsOptional()
    master: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    queues: any[];
}