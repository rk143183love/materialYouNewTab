import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Mobile number validation (Indian format)
export const mobileSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Invalid mobile number');

// GST validation (Indian format)
export const gstSchema = z
  .string()
  .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST number');

// PAN validation (Indian format)
export const panSchema = z
  .string()
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number');

// IFSC validation (Indian bank format)
export const ifscSchema = z
  .string()
  .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code');

// Aadhaar validation (12 digit)
export const aadhaarSchema = z
  .string()
  .regex(/^[0-9]{12}$/, 'Invalid Aadhaar number');

// Login schema
export const loginSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Organization schema
export const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  logo: z.string().optional(),
  gst: gstSchema.optional(),
  pan: panSchema.optional(),
  address: z.string().min(1, 'Address is required'),
  phone: mobileSchema,
  email: emailSchema,
  website: z.string().url('Invalid website URL').optional(),
});

// Division schema
export const divisionSchema = z.object({
  name: z.string().min(1, 'Division name is required'),
  code: z.string().min(1, 'Division code is required'),
  manager: z.string().min(1, 'Manager is required'),
  description: z.string().optional(),
});

// Employee schema
export const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: emailSchema.optional(),
  mobileNumber: mobileSchema,
  dateOfBirth: z.coerce.date(),
  gender: z.enum(['male', 'female', 'other']),
  aadhaar: aadhaarSchema.optional(),
  pan: panSchema.optional(),
  divisionId: z.string().min(1, 'Division is required'),
  companyId: z.string().min(1, 'Company is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type OrganizationFormData = z.infer<typeof organizationSchema>;
export type DivisionFormData = z.infer<typeof divisionSchema>;
export type EmployeeFormData = z.infer<typeof employeeSchema>;
