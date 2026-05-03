import ResourcePage from '../components/ResourcePage';
import { buildingApi } from '../api/client';
import type { Building, FormField } from '../types';

const columns = [
  { key: 'id',      label: 'ID' },
  { key: 'name',    label: 'Name' },
  { key: 'address', label: 'Address' },
];

const formFields: FormField[] = [
  { key: 'name',    label: 'Building Name', type: 'text' },
  { key: 'address', label: 'Address',       type: 'text', fullWidth: true },
];

const emptyForm = { name: '', address: '' };

export default function Buildings() {
  return (
    <ResourcePage<Building>
      title="Buildings"
      subtitle="Manage your property buildings"
      columns={columns}
      formFields={formFields}
      emptyForm={emptyForm}
      fetchAll={buildingApi.getAll}
      create={buildingApi.create as (d: Record<string, string | number>) => Promise<Building>}
      remove={buildingApi.remove}
    />
  );
}