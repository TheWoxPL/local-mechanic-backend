import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function getMongoConnectionString(configService: ConfigService): string {
  const hostDev = configService.get<string>('MONGODB_HOST_DEV');
  const portDev = configService.get<string>('MONGODB_PORT_DEV');
  const databaseDev = configService.get<string>('MONGODB_DATABASE_DEV');
  const userDev = configService.get<string>('MONGODB_USER_DEV');
  const passwordDev = configService.get<string>('MONGODB_PASSWORD_DEV');

  const host = configService.get<string>('MONGODB_HOST');
  const database = configService.get<string>('MONGODB_DATABASE');
  const user = configService.get<string>('MONGODB_USER');
  const password = configService.get<string>('MONGODB_PASSWORD');

  const isSrv = configService.get<string>('MONGODB_SRV') === 'true';

  if (isSrv === true) {
    Logger.debug('Using SRV connection string');
    return user && password
      ? `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=local-mechanic-service`
      : `mongodb+srv://${host}/${database}?retryWrites=true&w=majority&appName=local-mechanic-service`;
  } else {
    Logger.debug('Using standard connection string');
    return userDev && passwordDev
      ? `mongodb://${userDev}:${passwordDev}@${hostDev}:${portDev}/${databaseDev}?authSource=admin`
      : `mongodb://${hostDev}:${portDev}/${databaseDev}`;
  }
}
