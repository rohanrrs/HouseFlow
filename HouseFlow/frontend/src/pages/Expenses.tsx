import { useState, useEffect } from 'react';
import ResourcePage from '../components/ResourcePage';
import { expenseApi, buildingApi } from '../api/client';
import type { Expense, Building, FormField } from '../types';

const columns = [
  { key: 'id',         label: 'ID' },
  { key: 'type',       label: 'Type' },
  { key: 'amount',     label: 'Amount', render: (e: Expense) => `$${e.amount.toLocaleString()}` },
  { key: 'date',       label: 'Date' },
  { key: 'buildingId', label: 'Building ID' },
];

export default function Expenses() {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    buildingApi.getAll().then(setBuildings).catch(() => {});
  }, []);

  const formFields: FormField[] = [
    { key: 'type',   label: 'Expense Type', type: 'text' },
    { key: 'amount', label: 'Amount',        type: 'number', step: '0.01' },
    { key: 'date',   label: 'Date',          type: 'date' },
    {
      key: 'buildingId', label: 'Building', type: 'select', fullWidth: true,
      options: buildings.map(b => ({ value: b.id, label: `${b.name} — ${b.address}` })),
    },
  ];

  return (
    <ResourcePage<Expense>
      title="Expenses"
      subtitle="Building maintenance and operational costs"
      columns={columns}
      formFields={formFields}
      emptyForm={{ type: '', amount: 0, date: '', buildingId: '' }}
      fetchAll={expenseApi.getAll}
      create={expenseApi.create as (d: Record<string, string | number>) => Promise<Expense>}
      remove={expenseApi.remove}
    />
  );
}