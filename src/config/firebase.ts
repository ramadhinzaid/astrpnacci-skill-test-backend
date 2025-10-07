import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
const dbURL = process.env.FIREBASE_DB_URL;

if (!serviceAccountKeyPath) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY_PATH is not set in the environment variables."
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKeyPath),
  databaseURL: dbURL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const BUCKET_NAME = process.env.FIREBASE_STORAGE_BUCKET;

export const db = admin.firestore();
