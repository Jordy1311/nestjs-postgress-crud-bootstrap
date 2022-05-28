import { IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  readonly task: string;

  @IsString()
  readonly importance: 'low' | 'medium' | 'high';
}
