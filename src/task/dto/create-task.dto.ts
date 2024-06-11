import { IsNotEmpty, IsNumber, IsDateString, Max, Min, IsBoolean, IsArray } from "class-validator";
import { Validate } from "class-validator";
import { Categorization } from "../enums/categorization.enum";


export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty() 
    @IsNumber()
    @Min(0, { message: 'Priority must be at least 0' })
    @Max(1000, { message: 'Priority must be at most 3' })
    priority: number;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @IsDateString()
    dueDate: Date;

    @IsNotEmpty()
    @IsBoolean()
    completionStatus: boolean;

    @IsArray()
    categorization: number[];

}
