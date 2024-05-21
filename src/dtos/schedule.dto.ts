import { IsDate, IsString } from "class-validator";

export class CreateScheduleDto {
    @IsString()
    type: string;
    @IsString()
    calendarId: string;
    @IsString()
    description: string;
    @IsString()
    date: string;
}