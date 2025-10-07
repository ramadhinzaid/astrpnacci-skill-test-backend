import * as admin from 'firebase-admin';
import { db } from '../config/firebase';
import { User } from '../models/user.model';

const usersCollection = db.collection('users');

export const getUsers = async (page: number = 1, limit: number = 10, search: string = ''): Promise<Omit<User, 'created_at' | 'updated_at' | 'password'>[]> => {
  let query: admin.firestore.Query = usersCollection;

  if (search) {
    query = query.where('name', '>=', search).where('name', '<=', search + '\uf8ff');
    query = query.where('email', '>=', search).where('email', '<=', search + '\uf8ff');
  }

  const snapshot = await query.offset((page - 1) * limit).limit(limit).get();
  const users: Omit<User, 'created_at' | 'updated_at' | 'password'>[] = [];
  snapshot.forEach(doc => {
    const { id, name, photo, email } = doc.data() as User;
    users.push({ id, name, photo, email });
  });
  return users;
};

export const getUserById = async (id: string): Promise<Omit<User, 'created_at' | 'updated_at' | 'password'> | undefined> => {
  const doc = await usersCollection.doc(id).get();
  if (!doc.exists) {
    return undefined;
  }
  const { created_at, updated_at, password, ...userResponse } = doc.data() as User;
  return userResponse;
};

export const createUser = async (uid: string, name: string, email: string, photo: string = ''): Promise<Omit<User, 'created_at' | 'updated_at' | 'password'> | undefined> => {
  const newUser: User = {
    id: uid,
    name,
    email,
    photo,
    created_at: new Date(),
    updated_at: new Date(),
  };
  await usersCollection.doc(uid).set(newUser);
  const { created_at, updated_at, password, ...userResponse } = newUser;
  return userResponse;
}

export const updateUser = async (id: string, name: string, photo: string): Promise<Omit<User, 'created_at' | 'updated_at' | 'password'> | undefined> => {
  const docRef = usersCollection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return undefined;
  }
  await docRef.update({ name, photo, updated_at: new Date() });
  const updatedDoc = await docRef.get();
  const { created_at, updated_at, password, ...userResponse } = updatedDoc.data() as User;
  return userResponse;
};

export const updateUserPhoto = async (id: string, photo: string): Promise<Omit<User, 'created_at' | 'updated_at' | 'password'> | undefined> => {
  const docRef = usersCollection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return undefined;
  }
  await docRef.update({ photo, updated_at: new Date() });
  const updatedDoc = await docRef.get();
  const { created_at, updated_at, password, ...userResponse } = updatedDoc.data() as User;
  return userResponse;
};