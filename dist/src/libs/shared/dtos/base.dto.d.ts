import { AccountBasicDto } from './account-basic.dto';
import { BasicDto } from './basic.dto';
export declare abstract class BaseDto extends BasicDto {
    createdAt?: Date;
    updatedAt: Date;
    createdBy?: AccountBasicDto;
    updatedBy: AccountBasicDto;
}
