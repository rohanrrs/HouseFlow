import { useState, useEffect } from 'react';
import ResourcePage from '../components/ResourcePage';
import { floorApi, buildingApi } from '../api/client';
import type { Floor, Building, FormField } from '../types';

const columns = [
  { key: 'id',          label: 'ID' },
  { key: 'floorNumber', label: 'Floor Number' },
  { key: 'buildingId',  label: 'Building ID' },
];

export default function Floors() {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    buildingApi.getAll().then(setBuildings).catch(() => {});
  }, []);

  const formFields: FormField[] = [
    { key: 'floorNumber', label: 'Floor Number', type: 'number' },
    {
      key: 'buildingId', label: 'Building', type: 'select',
      options: buildings.map(b => ({ value: b.id, label: `${b.name} (${b.address})` })),
    },
  ];

  return (
    <ResourcePage<Floor>
      title="Floors"
      subtitle="Floors within each building"
      columns={columns}
      formFields={formFields}
      emptyForm={{ floorNumber: 1, buildingId: '' }}
      fetchAll={floorApi.getAll}
      create={floorApi.create as (d: Record<string, string | number>) => Promise<Floor>}
      remove={floorApi.remove}
    />
  );
}