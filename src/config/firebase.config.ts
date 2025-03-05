if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error(
    'FIREBASE_PROJECT_ID is not defined in the environment variables'
  );
}

if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error(
    'FIREBASE_PRIVATE_KEY is not defined in the environment variables'
  );
}

if (!process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error(
    'FIREBASE_CLIENT_EMAIL is not defined in the environment variables'
  );
}

export const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};
