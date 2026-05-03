import { useState, useEffect } from 'react';
import ResourcePage from '../components/ResourcePage';
import { tenantApi, unitApi } from '../api/client';
import type { Tenant, Unit, FormField } from '../types';

const columns = [
  { key: 'id',     label: 'ID' },
  { key: 'name',   label: 'Name' },
  { key: 'phone',  label: 'Phone' },
  { key: 'unitId', label: 'Unit ID' },
];

export default function Tenants() {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    unitApi.getAll().then(setUnits).catch(() => {});
  }, []);

  const formFields: FormField[] = [
    { key: 'name',  label: 'Full Name', type: 'text' },
    { key: 'phone', label: 'Phone',     type: 'text' },
    {
      key: 'unitId', label: 'Unit', type: 'select',
      options: units.map(u => ({ value: u.id, label: `Unit ${u.unitNumber} — $${u.rent}/mo` })),
    },
  ];

  return (
    <ResourcePage<Tenant>
      title="Tenants"
      subtitle="People renting units in your buildings"
      columns={columns}
      formFields={formFields}
      emptyForm={{ name: '', phone: '', unitId: '' }}
      fetchAll={tenantApi.getAll}
      create={tenantApi.create as (d: Record<string, string | number>) => Promise<Tenant>}
      remove={tenantApi.remove}
    />
  );
}