import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class createTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  hours_to_complete: number;

  @IsDateString()
  @IsNotEmpty()
  expiration_date: Date;

  @IsOptional()
  @IsArray()
  users: number[];

  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
