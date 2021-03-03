import { Type } from "class-transformer";
import {IsNumber, IsEmail, IsString } from "class-validator";

import { ReadDetailsDto } from "./read-user-details.dto";
export class ReadUserDto{
    @IsNumber()
    readonly id: number;
    @IsEmail()
    readonly email: string;
    @IsString()
    readonly username: string;
    @Type(type=>ReadDetailsDto)
    readonly details: ReadDetailsDto;


}