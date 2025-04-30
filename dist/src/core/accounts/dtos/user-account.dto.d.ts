import { AccountBasicDto, SystemStatus } from '../../../libs';
import { RoleDto } from '../../roles/dtos/role.dto';
export declare class UserAccountDto extends AccountBasicDto {
    firstName?: string;
    lastName?: string;
    email: string;
    role: RoleDto[];
    status: SystemStatus;
    get fullName(): string;
    get initials(): string;
}
