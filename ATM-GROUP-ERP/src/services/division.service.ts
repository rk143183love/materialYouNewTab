import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { Division } from '@/types';
import { generateDivisionCode } from '@/utils/ids';

const COLLECTION_NAME = 'divisions';

export class DivisionService {
  static async create(
    orgId: string,
    divisionData: Omit<Division, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      const code = generateDivisionCode(divisionData.name);
      const docRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(docRef, {
        ...divisionData,
        organizationId: orgId,
        code,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating division:', error);
      throw error;
    }
  }

  static async getByOrgId(orgId: string): Promise<Division[]> {
    try {
      const collectionRef = collection(db, COLLECTION_NAME);
      const q = query(collectionRef, where('organizationId', '==', orgId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Division[];
    } catch (error) {
      console.error('Error fetching divisions:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Division | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as Division) : null;
    } catch (error) {
      console.error('Error fetching division:', error);
      throw error;
    }
  }

  static async update(id: string, data: Partial<Division>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating division:', error);
      throw error;
    }
  }
}
