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
import { Salary } from '@/types';
import { calculateGrossSalary, calculateNetSalary } from '@/utils/calculations';

const COLLECTION_NAME = 'salary';

export class SalaryService {
  static async generate(
    orgId: string,
    employeeId: string,
    companyId: string,
    presentDays: number,
    dailyRate: number,
    advance: number,
    mess: number,
    roomRent: number,
    recovery: number
  ): Promise<string> {
    try {
      const grossSalary = calculateGrossSalary(presentDays, dailyRate);
      const netSalary = calculateNetSalary(grossSalary, advance, mess, roomRent, recovery);

      const docRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(docRef, {
        organizationId: orgId,
        employeeId,
        companyId,
        month: new Date(),
        presentDays,
        rate: dailyRate,
        grossSalary,
        advance,
        mess,
        roomRent,
        recovery,
        netSalary,
        status: 'generated',
        generatedDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error generating salary:', error);
      throw error;
    }
  }

  static async getByEmployeeAndMonth(employeeId: string, month: Date): Promise<Salary | null> {
    try {
      const collectionRef = collection(db, COLLECTION_NAME);
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const q = query(
        collectionRef,
        where('employeeId', '==', employeeId),
        where('month', '>=', startOfMonth),
        where('month', '<=', endOfMonth)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.length > 0 ? (querySnapshot.docs[0].data() as Salary) : null;
    } catch (error) {
      console.error('Error fetching salary:', error);
      throw error;
    }
  }

  static async update(id: string, data: Partial<Salary>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating salary:', error);
      throw error;
    }
  }
}
