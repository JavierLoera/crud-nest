import {
  IsArray,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class updateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  hours_to_complete: number;

  @IsDateString()
  @IsOptional()
  expiration_date: Date;

  @IsOptional()
  @IsArray()
  users: number[];

  @IsIn([1, 2])
  @IsOptional()
  status: number;

  @IsOptional()
  @IsNumber()
  cost: number;
}
