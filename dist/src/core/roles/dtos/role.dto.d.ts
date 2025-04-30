import { Action, BaseDto, Subject, SystemStatus } from '../../../libs';
export declare class PermissionRule {
    action: Action;
    subject: Subject;
}
export declare class RoleDto extends BaseDto {
    name: string;
    code: string;
    permissions: PermissionRule[];
    status: SystemStatus;
}
