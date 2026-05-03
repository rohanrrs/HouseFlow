import axios from 'axios';
import type { Building, Floor, Unit, Tenant, Rent, Payment, Expense, User } from '../types';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

const crud = <T extends { id: number }>(path: string) => ({
  getAll: (): Promise<T[]> => api.get<T[]>(path).then(r => r.data),
  getById: (id: number): Promise<T> => api.get<T>(`${path}/${id}`).then(r => r.data),
  create: (data: Omit<T, 'id'>): Promise<T> => api.post<T>(path, data).then(r => r.data),
  remove: (id: number): Promise<void> => api.delete(`${path}/${id}`).then(),
});

export const buildingApi = crud<Building>('/buildings');
export const floorApi = crud<Floor>('/floors');
export const unitApi = crud<Unit>('/units');
export const tenantApi = crud<Tenant>('/tenants');
export const rentApi = crud<Rent>('/rents');
export const paymentApi = crud<Payment>('/payments');
export const expenseApi = crud<Expense>('/expenses');
export const userApi = {
  ...crud<User>('/users'),
  getByName: (name: string): Promise<User> => api.get<User>(`/users/name/${name}`).then(r => r.data),
};