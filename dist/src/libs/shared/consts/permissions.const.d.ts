import { Subject, Action } from '../enums/';
export declare class AppPermissions {
    static readonly ADMIN: {
        action: Action;
        subject: Subject;
    };
    static readonly ROLES: {
        MANAGE: {
            action: Action;
            subject: Subject;
        };
        DISPLAY: {
            action: Action;
            subject: Subject;
        };
    };
    static readonly ACCOUNTS: {
        MANAGE: {
            action: Action;
            subject: Subject;
        };
        DISPLAY: {
            action: Action;
            subject: Subject;
        };
    };
    static readonly APP: {
        DISPLAY: {
            action: Action;
            subject: Subject;
        };
    };
}
