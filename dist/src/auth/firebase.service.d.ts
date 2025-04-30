import * as admin from 'firebase-admin';
export declare class FirebaseService {
    constructor();
    private initializeFirebaseAdmin;
    verifyGoogleToken(idToken: string): Promise<admin.auth.DecodedIdToken>;
}
