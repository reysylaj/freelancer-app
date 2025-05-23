//saved/dto/save-item.dto.ts
import { IsNumber, IsOptional } from 'class-validator';

export class SaveItemDto {
    @IsOptional()
    @IsNumber()
    jobId?: number;

    @IsOptional()
    @IsNumber()
    projectId?: number;
}
