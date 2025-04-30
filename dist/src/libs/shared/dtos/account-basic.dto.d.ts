import { BasicDto } from './basic.dto';
export declare abstract class AccountBasicDto extends BasicDto {
    username: string;
    avatarUrl?: string;
    abstract fullName: string;
    abstract initials: string;
}
