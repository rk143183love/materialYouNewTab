// Core Organization Types
export interface Organization {
  id: string;
  name: string;
  logo: string;
  gst: string;
  pan: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Division {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  manager: string;
  logo: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  organizationId: string;
  divisionId: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  organizationId: string;
  divisionId: string;
  serviceId: string;
  name: string;
  code: string;
  logo: string;
  industry: string;
  gstNumber: string;
  panNumber: string;
  agreementNumber: string;
  agreementStartDate: Date;
  agreementEndDate: Date;
  paymentTerms: '7' | '15' | '30' | '45' | '60';
  status: 'active' | 'inactive' | 'blacklisted';
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  organizationId: string;
  divisionId: string;
  serviceId: string;
  clientId: string;
  name: string;
  code: string;
  supervisorId: string;
  maleRate: number;
  femaleRate: number;
  nightShiftRate: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  id: string;
  organizationId: string;
  employeeCode: string;
  photo: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  mobileNumber: string;
  divisionId: string;
  serviceId: string;
  companyId: string;
  joiningDate: Date;
  status: 'active' | 'inactive' | 'left';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  organizationId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  ACCOUNTS_MANAGER = 'accounts_manager',
  DIVISION_MANAGER = 'division_manager',
}

export interface Permission {
  module: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface ActivityLog {
  id: string;
  organizationId: string;
  userId: string;
  action: string;
  module: string;
  createdAt: Date;
}