export interface Building {
  id: number;
  name: string;
  address: string;
}

export interface Floor {
  id: number;
  floorNumber: number;
  buildingId: number;
}

export interface Unit {
  id: number;
  unitNumber: string;
  rent: number;
  floorId: number;
}

export interface Tenant {
  id: number;
  name: string;
  phone: string;
  unitId: number;
}

export interface Rent {
  id: number;
  month: number;
  year: number;
  baseRent: number;
  electricity: number;
  water: number;
  serviceCharge: number;
  totalAmount: number;
  status: string;
  unitId: number;
}

export interface Payment {
  id: number;
  amount: number;
  month: string;
  status: string;
  unitId: number;
  tenantId: number;
}

export interface Expense {
  id: number;
  type: string;
  amount: number;
  date: string;
  buildingId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: SelectOption[];
  fullWidth?: boolean;
  step?: string;
}