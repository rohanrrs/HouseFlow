import { useEffect, useState } from 'react';
import { buildingApi, floorApi, unitApi, tenantApi, rentApi, paymentApi, expenseApi, userApi } from '../api/client';

interface Stat { icon: string; label: string; value: number | string; }

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      buildingApi.getAll(),
      floorApi.getAll(),
      unitApi.getAll(),
      tenantApi.getAll(),
      rentApi.getAll(),
      paymentApi.getAll(),
      expenseApi.getAll(),
      userApi.getAll(),
    ]).then(results => {
      const counts = results.map(r => r.status === 'fulfilled' ? r.value.length : '—');
      setStats([
        { icon: '🏢', label: 'Buildings',  value: counts[0] },
        { icon: '📐', label: 'Floors',     value: counts[1] },
        { icon: '🚪', label: 'Units',      value: counts[2] },
        { icon: '👤', label: 'Tenants',    value: counts[3] },
        { icon: '📋', label: 'Rent Bills', value: counts[4] },
        { icon: '💳', label: 'Payments',   value: counts[5] },
        { icon: '💸', label: 'Expenses',   value: counts[6] },
        { icon: '🔑', label: 'Users',      value: counts[7] },
      ]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-text">
          <h2>Dashboard</h2>
          <p>Overview of your property portfolio</p>
        </div>
      </div>

      {loading ? (
        <div className="state"><div className="state-icon">⏳</div><p>Loading…</p></div>
      ) : (
        <div className="stat-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}