import {Injectable, InternalServerErrorException} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor() {
    this.initializeFirebaseAdmin();
  }
  private initializeFirebaseAdmin(): void {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    if (!projectId || !privateKey || !clientEmail) {
      throw new Error(
        'Firebase configuration is missing required environment variables'
      );
    }
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail
        })
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to initialize Firebase Admin: ${error}`
      );
    }
  }
  async verifyGoogleToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new InternalServerErrorException('Invalid Firebase ID token');
    }
  }
}
