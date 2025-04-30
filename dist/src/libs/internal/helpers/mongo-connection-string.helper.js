"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConnectionString = getMongoConnectionString;
const common_1 = require("@nestjs/common");
function getMongoConnectionString(configService) {
    const hostDev = configService.get('MONGODB_HOST_DEV');
    const portDev = configService.get('MONGODB_PORT_DEV');
    const databaseDev = configService.get('MONGODB_DATABASE_DEV');
    const userDev = configService.get('MONGODB_USER_DEV');
    const passwordDev = configService.get('MONGODB_PASSWORD_DEV');
    const host = configService.get('MONGODB_HOST');
    const database = configService.get('MONGODB_DATABASE');
    const user = configService.get('MONGODB_USER');
    const password = configService.get('MONGODB_PASSWORD');
    const isSrv = configService.get('MONGODB_SRV') === 'true';
    if (isSrv === true) {
        common_1.Logger.debug('Using SRV connection string');
        return user && password
            ? `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=local-mechanic-service`
            : `mongodb+srv://${host}/${database}?retryWrites=true&w=majority&appName=local-mechanic-service`;
    }
    else {
        common_1.Logger.debug('Using standard connection string');
        return userDev && passwordDev
            ? `mongodb://${userDev}:${passwordDev}@${hostDev}:${portDev}/${databaseDev}?authSource=admin`
            : `mongodb://${hostDev}:${portDev}/${databaseDev}`;
    }
}
//# sourceMappingURL=mongo-connection-string.helper.js.map