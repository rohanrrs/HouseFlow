import ResourcePage from '../components/ResourcePage';
import { userApi } from '../api/client';
import type { User, FormField } from '../types';

const ROLE_OPTIONS = [
  { value: 'ADMIN',   label: 'Admin' },
  { value: 'OWNER',   label: 'Owner' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'TENANT',  label: 'Tenant' },
];

const columns = [
  { key: 'id',    label: 'ID' },
  { key: 'name',  label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  {
    key: 'role', label: 'Role',
    render: (u: User) => <span className={`badge badge-${u.role}`}>{u.role}</span>,
  },
];

const formFields: FormField[] = [
  { key: 'name',  label: 'Full Name', type: 'text' },
  { key: 'email', label: 'Email',     type: 'text' },
  { key: 'phone', label: 'Phone',     type: 'text' },
  { key: 'role',  label: 'Role',      type: 'select', options: ROLE_OPTIONS },
];

export default function Users() {
  return (
    <ResourcePage<User>
      title="Users"
      subtitle="System users and their access roles"
      columns={columns}
      formFields={formFields}
      emptyForm={{ name: '', email: '', phone: '', role: 'TENANT' }}
      fetchAll={userApi.getAll}
      create={userApi.create as (d: Record<string, string | number>) => Promise<User>}
      remove={userApi.remove}
    />
  );
}