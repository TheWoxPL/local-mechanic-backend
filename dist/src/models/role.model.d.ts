import { Action, Subject } from '../libs';
import { BaseClass } from './base.model';
export declare class PermissionRule {
    action: Action;
    subject: Subject;
}
export declare class Role extends BaseClass {
    name: string;
    permissions: PermissionRule[];
}
export declare const RoleSchema: import("mongoose").Schema<Role, import("mongoose").Model<Role, any, any, any, import("mongoose").Document<unknown, any, Role> & Role & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Role, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Role>> & import("mongoose").FlatRecord<Role> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
