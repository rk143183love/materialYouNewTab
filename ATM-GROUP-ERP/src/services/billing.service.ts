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
import { Billing } from '@/types';
import { generateInvoiceNumber } from '@/utils/ids';
import { calculateGST } from '@/utils/calculations';

const COLLECTION_NAME = 'billing';

export class BillingService {
  static async createInvoice(
    orgId: string,
    clientId: string,
    companyId: string,
    month: Date,
    billType: 'gst' | 'non-gst',
    employeeCount: number,
    attendanceAmount: number,
    salaryAmount: number,
    serviceCharge: number,
    prefix: string = 'INV'
  ): Promise<string> {
    try {
      const invoiceNumber = generateInvoiceNumber(prefix);
      const subtotal = attendanceAmount + salaryAmount + serviceCharge;
      let gstAmount = 0;
      let grandTotal = subtotal;

      if (billType === 'gst') {
        gstAmount = calculateGST(subtotal);
        grandTotal = subtotal + gstAmount;
      }

      const docRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(docRef, {
        organizationId: orgId,
        invoiceNumber,
        clientId,
        companyId,
        month,
        billType,
        employeeCount,
        attendanceAmount,
        salaryAmount,
        serviceCharge,
        subtotal,
        gstAmount,
        grandTotal,
        status: 'generated',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Billing | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as Billing) : null;
    } catch (error) {
      console.error('Error fetching billing:', error);
      throw error;
    }
  }

  static async getByClientAndMonth(clientId: string, month: Date): Promise<Billing[]> {
    try {
      const collectionRef = collection(db, COLLECTION_NAME);
      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const q = query(
        collectionRef,
        where('clientId', '==', clientId),
        where('month', '>=', startOfMonth),
        where('month', '<=', endOfMonth)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Billing[];
    } catch (error) {
      console.error('Error fetching billing:', error);
      throw error;
    }
  }

  static async updateStatus(id: string, status: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        status,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating billing status:', error);
      throw error;
    }
  }
}
