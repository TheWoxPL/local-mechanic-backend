import { SystemStatus } from 'src/libs/shared/enums/system-status.enum';
export declare class ResponseTokenDTO {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    status: SystemStatus.ACTIVE | SystemStatus.INACTIVE;
}
