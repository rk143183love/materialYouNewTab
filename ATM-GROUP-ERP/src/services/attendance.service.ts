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
import { Attendance } from '@/types';

const COLLECTION_NAME = 'attendance';

export class AttendanceService {
  static async record(
    orgId: string,
    attendanceData: Omit<Attendance, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      const docRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(docRef, {
        ...attendanceData,
        organizationId: orgId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error recording attendance:', error);
      throw error;
    }
  }

  static async getByEmployeeAndDate(employeeId: string, date: Date): Promise<Attendance | null> {
    try {
      const collectionRef = collection(db, COLLECTION_NAME);
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const q = query(
        collectionRef,
        where('employeeId', '==', employeeId),
        where('date', '>=', startOfDay),
        where('date', '<=', endOfDay)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.length > 0 ? (querySnapshot.docs[0].data() as Attendance) : null;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }
  }

  static async getByEmployeeAndMonth(employeeId: string, startDate: Date, endDate: Date): Promise<Attendance[]> {
    try {
      const collectionRef = collection(db, COLLECTION_NAME);
      const q = query(
        collectionRef,
        where('employeeId', '==', employeeId),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Attendance[];
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      throw error;
    }
  }

  static async update(id: string, data: Partial<Attendance>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating attendance:', error);
      throw error;
    }
  }
}
