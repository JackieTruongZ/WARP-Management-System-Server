import { IsString } from "class-validator";

export class CreateCalendarDto {
    @IsString()
    status: string;
    @IsString()
    type: string;
    @IsString()
    owner: string;
}