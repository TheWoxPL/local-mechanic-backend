import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Express } from 'express';

@Injectable()
export class FirebaseService {
  constructor() {
    this.initializeFirebaseAdmin();
  }
  private initializeFirebaseAdmin(): void {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
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
        }),
        storageBucket: bucketName
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

  async uploadImageToStorage(
    file: Express.Multer.File,
    directoryName: string
  ): Promise<string> {
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

    const bucket = admin.storage().bucket(bucketName);
    const fileName = `${directoryName}/${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    try {
      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype
        },
        public: true
      });

      return `https://storage.googleapis.com/${bucketName}/${fileName}`;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to upload image to Firebase Storage'
      );
    }
  }
}
