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
import { Employee } from '@/types';
import { generateEmployeeId } from '@/utils/ids';

const COLLECTION_NAME = 'employees';

export class EmployeeService {
  static async create(
    orgId: string,
    employeeData: Omit<Employee, 'id' | 'organizationId' | 'employeeCode' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      const employeeCode = generateEmployeeId();
      const docRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(docRef, {
        ...employeeData,
        organizationId: orgId,
        employeeCode,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }

  static async getByCompanyId(companyId: string): Promise<Employee[]> {
    try {
      const collectionRef = collection(db, COLLECTION_NAME);
      const q = query(collectionRef, where('companyId', '==', companyId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Employee | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as Employee) : null;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  }

  static async update(id: string, data: Partial<Employee>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  }

  static async getByStatus(status: string): Promise<Employee[]> {
    try {
      const collectionRef = collection(db, COLLECTION_NAME);
      const q = query(collectionRef, where('status', '==', status));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];
    } catch (error) {
      console.error('Error fetching employees by status:', error);
      throw error;
    }
  }
}
