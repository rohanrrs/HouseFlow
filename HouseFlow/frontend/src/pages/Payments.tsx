import { useState, useEffect } from 'react';
import ResourcePage from '../components/ResourcePage';
import { paymentApi, unitApi, tenantApi } from '../api/client';
import type { Payment, Unit, Tenant, FormField } from '../types';

const STATUS_OPTIONS = [
  { value: 'UNPAID',  label: 'Unpaid' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PAID',    label: 'Paid' },
];

const columns = [
  { key: 'id',       label: 'ID' },
  { key: 'amount',   label: 'Amount', render: (p: Payment) => `$${p.amount.toLocaleString()}` },
  { key: 'month',    label: 'Month' },
  {
    key: 'status', label: 'Status',
    render: (p: Payment) => <span className={`badge badge-${p.status}`}>{p.status}</span>,
  },
  { key: 'unitId',   label: 'Unit ID' },
  { key: 'tenantId', label: 'Tenant ID' },
];

export default function Payments() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    Promise.allSettled([unitApi.getAll(), tenantApi.getAll()]).then(([u, t]) => {
      if (u.status === 'fulfilled') setUnits(u.value);
      if (t.status === 'fulfilled') setTenants(t.value);
    });
  }, []);

  const formFields: FormField[] = [
    { key: 'amount', label: 'Amount',              type: 'number', step: '0.01' },
    { key: 'month',  label: 'Month (e.g. Jan 2024)', type: 'text' },
    { key: 'status', label: 'Status',              type: 'select', options: STATUS_OPTIONS },
    {
      key: 'unitId', label: 'Unit', type: 'select',
      options: units.map(u => ({ value: u.id, label: `Unit ${u.unitNumber}` })),
    },
    {
      key: 'tenantId', label: 'Tenant', type: 'select',
      options: tenants.map(t => ({ value: t.id, label: `${t.name} (${t.phone})` })),
    },
  ];

  return (
    <ResourcePage<Payment>
      title="Payments"
      subtitle="Payment records from tenants"
      columns={columns}
      formFields={formFields}
      emptyForm={{ amount: 0, month: '', status: 'UNPAID', unitId: '', tenantId: '' }}
      fetchAll={paymentApi.getAll}
      create={paymentApi.create as (d: Record<string, string | number>) => Promise<Payment>}
      remove={paymentApi.remove}
    />
  );
}