import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Query,
  QueryConstraint,
} from 'firebase/firestore';
import { Organization } from '@/types';

const COLLECTION_NAME = 'organizations';

export class OrganizationService {
  static async create(orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(docRef, {
        ...orgData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating organization:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Organization | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as Organization) : null;
    } catch (error) {
      console.error('Error fetching organization:', error);
      throw error;
    }
  }

  static async getAll(): Promise<Organization[]> {
    try {
      const collectionRef = collection(db, COLLECTION_NAME);
      const querySnapshot = await getDocs(collectionRef);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Organization[];
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  }

  static async update(id: string, data: Partial<Organization>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating organization:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting organization:', error);
      throw error;
    }
  }
}
