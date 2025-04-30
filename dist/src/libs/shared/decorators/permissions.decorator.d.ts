import { CustomDecorator } from '@nestjs/common';
import { RequiredPermissions } from 'src/libs';
export declare const PERMISSION_KEY = "Permissions";
export declare const Permissions: (permissions: RequiredPermissions | RequiredPermissions[]) => CustomDecorator<string>;
