"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let FirebaseService = class FirebaseService {
    constructor() {
        this.initializeFirebaseAdmin();
    }
    initializeFirebaseAdmin() {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        if (!projectId || !privateKey || !clientEmail) {
            throw new Error('Firebase configuration is missing required environment variables');
        }
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    privateKey,
                    clientEmail
                })
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to initialize Firebase Admin: ${error}`);
        }
    }
    async verifyGoogleToken(idToken) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            return decodedToken;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Invalid Firebase ID token');
        }
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map