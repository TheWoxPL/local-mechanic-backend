import { Subject, Action } from '../enums/';

export class AppPermissions {
  static readonly ADMIN = {
    action: Action.MANAGE,
    subject: Subject.ALL
  };
  static readonly ROLES = {
    MANAGE: {
      action: Action.MANAGE,
      subject: Subject.ROLES
    },
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.ROLES
    }
  };
  static readonly ACCOUNTS = {
    MANAGE: {
      action: Action.MANAGE,
      subject: Subject.ACCOUNTS
    },
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.ACCOUNTS
    }
  };
  static readonly APP = {
    DISPLAY: {
      action: Action.DISPLAY,
      subject: Subject.ALL
    }
  };
}
