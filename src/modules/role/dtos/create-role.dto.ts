import{IsString, MaxLength} from "class-validator"
export class CreateRoleDto{
    @IsString()
    @MaxLength(50, {message: 'this name is not valid'})
    readonly name : string;
    @IsString()
    @MaxLength(100, {message: 'this decription is not valid'})
    readonly descripcion: string;

}