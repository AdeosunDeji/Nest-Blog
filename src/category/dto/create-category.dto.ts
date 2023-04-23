import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
    @MinLength(2)
    @IsNotEmpty()
    @IsString()
    name: string
}