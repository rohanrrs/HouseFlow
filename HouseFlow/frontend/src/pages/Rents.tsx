import { useState, useEffect } from 'react';
import ResourcePage from '../components/ResourcePage';
import { rentApi, unitApi } from '../api/client';
import type { Rent, Unit, FormField } from '../types';

const STATUS_OPTIONS = [
  { value: 'UNPAID',  label: 'Unpaid' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PAID',    label: 'Paid' },
];

const columns = [
  { key: 'id',          label: 'ID' },
  { key: 'month',       label: 'Month' },
  { key: 'year',        label: 'Year' },
  { key: 'totalAmount', label: 'Total', render: (r: Rent) => `$${r.totalAmount.toLocaleString()}` },
  {
    key: 'status', label: 'Status',
    render: (r: Rent) => <span className={`badge badge-${r.status}`}>{r.status}</span>,
  },
  { key: 'unitId', label: 'Unit ID' },
];

export default function Rents() {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    unitApi.getAll().then(setUnits).catch(() => {});
  }, []);

  const formFields: FormField[] = [
    { key: 'month',         label: 'Month (1–12)',    type: 'number' },
    { key: 'year',          label: 'Year',            type: 'number' },
    { key: 'baseRent',      label: 'Base Rent',       type: 'number', step: '0.01' },
    { key: 'electricity',   label: 'Electricity',     type: 'number', step: '0.01' },
    { key: 'water',         label: 'Water',           type: 'number', step: '0.01' },
    { key: 'serviceCharge', label: 'Service Charge',  type: 'number', step: '0.01' },
    { key: 'totalAmount',   label: 'Total Amount',    type: 'number', step: '0.01' },
    { key: 'status',        label: 'Status',          type: 'select', options: STATUS_OPTIONS },
    {
      key: 'unitId', label: 'Unit', type: 'select', fullWidth: true,
      options: units.map(u => ({ value: u.id, label: `Unit ${u.unitNumber} — $${u.rent}/mo` })),
    },
  ];

  return (
    <ResourcePage<Rent>
      title="Rents"
      subtitle="Monthly rent bills for each unit"
      columns={columns}
      formFields={formFields}
      emptyForm={{ month: 1, year: new Date().getFullYear(), baseRent: 0, electricity: 0, water: 0, serviceCharge: 0, totalAmount: 0, status: 'UNPAID', unitId: '' }}
      fetchAll={rentApi.getAll}
      create={rentApi.create as (d: Record<string, string | number>) => Promise<Rent>}
      remove={rentApi.remove}
    />
  );
}