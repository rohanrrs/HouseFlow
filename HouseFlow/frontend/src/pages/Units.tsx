import { useState, useEffect } from 'react';
import ResourcePage from '../components/ResourcePage';
import { unitApi, floorApi } from '../api/client';
import type { Unit, Floor, FormField } from '../types';

const columns = [
  { key: 'id',         label: 'ID' },
  { key: 'unitNumber', label: 'Unit No.' },
  { key: 'rent',       label: 'Rent', render: (row: Unit) => `$${row.rent.toLocaleString()}` },
  { key: 'floorId',    label: 'Floor ID' },
];

export default function Units() {
  const [floors, setFloors] = useState<Floor[]>([]);

  useEffect(() => {
    floorApi.getAll().then(setFloors).catch(() => {});
  }, []);

  const formFields: FormField[] = [
    { key: 'unitNumber', label: 'Unit Number', type: 'text' },
    { key: 'rent',       label: 'Monthly Rent', type: 'number', step: '0.01' },
    {
      key: 'floorId', label: 'Floor', type: 'select',
      options: floors.map(f => ({ value: f.id, label: `Floor ${f.floorNumber} (Building ${f.buildingId})` })),
    },
  ];

  return (
    <ResourcePage<Unit>
      title="Units"
      subtitle="Individual rental units on each floor"
      columns={columns}
      formFields={formFields}
      emptyForm={{ unitNumber: '', rent: 0, floorId: '' }}
      fetchAll={unitApi.getAll}
      create={unitApi.create as (d: Record<string, string | number>) => Promise<Unit>}
      remove={unitApi.remove}
    />
  );
}