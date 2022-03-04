//For using dto we have to install class validator package
//npm install class-validator class-transformer 
//For validation we need use the class validator 

import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString  } from "class-validator";
import {Exclude, Expose} from "class-transformer"

import { ReportType } from "src/data";

export class CreateReportDto {
    @IsNumber()//This is class validator which checks if it's a number
    @IsPositive()//Number should be a positive number
    amount: number;

    @IsString()
    @IsNotEmpty()
    source: string;
}

export class UpdateReportDto {
    @IsOptional()//This means it is optional and however if you do provide it then it has to be a positive number
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source: string;
}
//In order to make sure that the only properties that we pass to our body are the ones that we define in our dto 
//We have to do a small configuration in main.ts file (whitelist)

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;
    created_at: Date;

    @Exclude()
    updated_at: Date;
    type: ReportType;
}//The exclude is gonna allow us to exclude certain properties from object that we want to return