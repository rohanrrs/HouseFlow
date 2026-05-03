import { useState, useEffect } from 'react';
import axios, { type AxiosError } from 'axios';

const BASE = 'http://localhost:8080';

type HttpMethod = 'GET' | 'POST' | 'DELETE';

interface Endpoint {
  id: string;
  method: HttpMethod;
  path: string;
  description: string;
  bodyHint?: string;
  paramKey?: 'id' | 'name';
}

interface Group {
  name: string;
  icon: string;
  accent: string;
  endpoints: Endpoint[];
}

const GROUPS: Group[] = [
  {
    name: 'Buildings', icon: '🏢', accent: '#3b82f6',
    endpoints: [
      { id: 'b-list',   method: 'GET',    path: '/api/buildings',      description: 'List all buildings' },
      { id: 'b-get',    method: 'GET',    path: '/api/buildings/{id}', description: 'Get building by ID',     paramKey: 'id' },
      { id: 'b-create', method: 'POST',   path: '/api/buildings',      description: 'Create a building',      bodyHint: '{ "name": "Block A", "address": "123 Main St" }' },
      { id: 'b-delete', method: 'DELETE', path: '/api/buildings/{id}', description: 'Delete a building',      paramKey: 'id' },
    ],
  },
  {
    name: 'Floors', icon: '📐', accent: '#8b5cf6',
    endpoints: [
      { id: 'fl-list',   method: 'GET',    path: '/api/floors',      description: 'List all floors' },
      { id: 'fl-get',    method: 'GET',    path: '/api/floors/{id}', description: 'Get floor by ID',   paramKey: 'id' },
      { id: 'fl-create', method: 'POST',   path: '/api/floors',      description: 'Create a floor',    bodyHint: '{ "floorNumber": 1, "buildingId": 1 }' },
      { id: 'fl-delete', method: 'DELETE', path: '/api/floors/{id}', description: 'Delete a floor',    paramKey: 'id' },
    ],
  },
  {
    name: 'Units', icon: '🚪', accent: '#06b6d4',
    endpoints: [
      { id: 'u-list',   method: 'GET',    path: '/api/units',      description: 'List all units' },
      { id: 'u-get',    method: 'GET',    path: '/api/units/{id}', description: 'Get unit by ID',  paramKey: 'id' },
      { id: 'u-create', method: 'POST',   path: '/api/units',      description: 'Create a unit',   bodyHint: '{ "unitNumber": "A-101", "rent": 500, "floorId": 1 }' },
      { id: 'u-delete', method: 'DELETE', path: '/api/units/{id}', description: 'Delete a unit',   paramKey: 'id' },
    ],
  },
  {
    name: 'Tenants', icon: '👤', accent: '#f59e0b',
    endpoints: [
      { id: 't-list',   method: 'GET',    path: '/api/tenants',      description: 'List all tenants' },
      { id: 't-get',    method: 'GET',    path: '/api/tenants/{id}', description: 'Get tenant by ID',  paramKey: 'id' },
      { id: 't-create', method: 'POST',   path: '/api/tenants',      description: 'Create a tenant',   bodyHint: '{ "name": "John Doe", "phone": "0171234567", "unitId": 1 }' },
      { id: 't-delete', method: 'DELETE', path: '/api/tenants/{id}', description: 'Delete a tenant',   paramKey: 'id' },
    ],
  },
  {
    name: 'Rent Bills', icon: '📋', accent: '#10b981',
    endpoints: [
      { id: 'r-list',   method: 'GET',    path: '/api/rents',      description: 'List all rent bills' },
      { id: 'r-get',    method: 'GET',    path: '/api/rents/{id}', description: 'Get rent bill by ID',  paramKey: 'id' },
      { id: 'r-create', method: 'POST',   path: '/api/rents',      description: 'Create a rent bill',   bodyHint: '{ "month": 1, "year": 2024, "baseRent": 400, "electricity": 50, "water": 20, "serviceCharge": 30, "totalAmount": 500, "status": "UNPAID", "unitId": 1 }' },
      { id: 'r-delete', method: 'DELETE', path: '/api/rents/{id}', description: 'Delete a rent bill',   paramKey: 'id' },
    ],
  },
  {
    name: 'Payments', icon: '💳', accent: '#ec4899',
    endpoints: [
      { id: 'p-list',   method: 'GET',    path: '/api/payments',      description: 'List all payments' },
      { id: 'p-get',    method: 'GET',    path: '/api/payments/{id}', description: 'Get payment by ID',  paramKey: 'id' },
      { id: 'p-create', method: 'POST',   path: '/api/payments',      description: 'Create a payment',   bodyHint: '{ "amount": 500, "month": "January 2024", "status": "PAID", "unitId": 1, "tenantId": 1 }' },
      { id: 'p-delete', method: 'DELETE', path: '/api/payments/{id}', description: 'Delete a payment',   paramKey: 'id' },
    ],
  },
  {
    name: 'Expenses', icon: '💸', accent: '#f97316',
    endpoints: [
      { id: 'e-list',   method: 'GET',    path: '/api/expenses',      description: 'List all expenses' },
      { id: 'e-get',    method: 'GET',    path: '/api/expenses/{id}', description: 'Get expense by ID',  paramKey: 'id' },
      { id: 'e-create', method: 'POST',   path: '/api/expenses',      description: 'Create an expense',  bodyHint: '{ "type": "Maintenance", "amount": 200, "date": "2024-01-15", "buildingId": 1 }' },
      { id: 'e-delete', method: 'DELETE', path: '/api/expenses/{id}', description: 'Delete an expense',  paramKey: 'id' },
    ],
  },
  {
    name: 'Users', icon: '🔑', accent: '#6366f1',
    endpoints: [
      { id: 'us-list',   method: 'GET',    path: '/api/users',           description: 'List all users' },
      { id: 'us-get',    method: 'GET',    path: '/api/users/{id}',      description: 'Get user by ID',    paramKey: 'id' },
      { id: 'us-name',   method: 'GET',    path: '/api/users/name/{name}', description: 'Get user by name', paramKey: 'name' },
      { id: 'us-create', method: 'POST',   path: '/api/users',           description: 'Create a user',     bodyHint: '{ "name": "Alice", "email": "alice@example.com", "phone": "01700000000", "role": "TENANT" }' },
      { id: 'us-delete', method: 'DELETE', path: '/api/users/{id}',      description: 'Delete a user',     paramKey: 'id' },
    ],
  },
];

interface EndpointState {
  open: boolean;
  loading: boolean;
  paramValue: string;
  status: number | null;
  time: number | null;
  data: unknown;
  error: string | null;
}

const defaultState = (): EndpointState => ({
  open: false, loading: false, paramValue: '', status: null, time: null, data: null, error: null,
});

function methodClass(m: HttpMethod) {
  return `method-badge method-${m}`;
}

function statusClass(code: number | null) {
  if (!code) return 'status-err';
  if (code < 300) return 'status-ok';
  if (code < 400) return 'status-redirect';
  return 'status-err';
}

export default function ApiExplorer() {
  const [states, setStates] = useState<Record<string, EndpointState>>({});
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(GROUPS.map(g => [g.name, true]))
  );

  useEffect(() => {
    axios.get(`${BASE}/api/buildings`, { timeout: 3000 })
      .then(() => setServerStatus('online'))
      .catch(() => setServerStatus('offline'));
  }, []);

  const getState = (id: string): EndpointState => states[id] ?? defaultState();

  const setEpState = (id: string, patch: Partial<EndpointState>) =>
    setStates(prev => ({ ...prev, [id]: { ...getState(id), ...patch } }));

  const execute = async (ep: Endpoint) => {
    const st = getState(ep.id);
    const pv = st.paramValue || '1';
    const url = ep.path
      .replace('{id}', pv)
      .replace('{name}', pv);

    setEpState(ep.id, { loading: true, open: true, error: null });
    const t0 = Date.now();
    try {
      const res = await axios.get(`${BASE}${url}`, { timeout: 6000 });
      setEpState(ep.id, {
        loading: false, status: res.status,
        time: Date.now() - t0, data: res.data, error: null,
      });
    } catch (raw) {
      const err = raw as AxiosError;
      setEpState(ep.id, {
        loading: false,
        status: err.response?.status ?? null,
        time: Date.now() - t0,
        data: err.response?.data ?? null,
        error: err.message,
      });
    }
  };

  const toggleGroup = (name: string) =>
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-text">
          <h2>API Explorer</h2>
          <p>Live view of all HouseFlow backend endpoints — Spring Boot running on {BASE}</p>
        </div>
        <div className={`server-pill server-${serverStatus}`}>
          <span className="server-dot" />
          {serverStatus === 'checking' ? 'Checking…' : serverStatus === 'online' ? 'Backend Online' : 'Backend Offline'}
        </div>
      </div>

      <div className="api-summary card" style={{ marginBottom: 24 }}>
        <div className="api-summary-inner">
          <div className="api-stat">
            <span className="api-stat-num">{GROUPS.reduce((s, g) => s + g.endpoints.length, 0)}</span>
            <span className="api-stat-label">Total Endpoints</span>
          </div>
          <div className="api-stat">
            <span className="api-stat-num" style={{ color: '#10b981' }}>
              {GROUPS.reduce((s, g) => s + g.endpoints.filter(e => e.method === 'GET').length, 0)}
            </span>
            <span className="api-stat-label">GET</span>
          </div>
          <div className="api-stat">
            <span className="api-stat-num" style={{ color: '#3b82f6' }}>
              {GROUPS.reduce((s, g) => s + g.endpoints.filter(e => e.method === 'POST').length, 0)}
            </span>
            <span className="api-stat-label">POST</span>
          </div>
          <div className="api-stat">
            <span className="api-stat-num" style={{ color: '#ef4444' }}>
              {GROUPS.reduce((s, g) => s + g.endpoints.filter(e => e.method === 'DELETE').length, 0)}
            </span>
            <span className="api-stat-label">DELETE</span>
          </div>
          <div className="api-stat">
            <span className="api-stat-num">{GROUPS.length}</span>
            <span className="api-stat-label">Resources</span>
          </div>
        </div>
      </div>

      <div className="api-groups">
        {GROUPS.map(group => (
          <div key={group.name} className="api-group card" style={{ '--accent': group.accent } as React.CSSProperties}>
            <button className="api-group-header" onClick={() => toggleGroup(group.name)}>
              <div className="api-group-title">
                <span className="api-group-icon">{group.icon}</span>
                <span>{group.name}</span>
                <span className="api-group-count">{group.endpoints.length} endpoints</span>
              </div>
              <span className="api-group-chevron">{expanded[group.name] ? '▾' : '▸'}</span>
            </button>

            {expanded[group.name] && (
              <div className="api-endpoint-list">
                {group.endpoints.map(ep => {
                  const st = getState(ep.id);
                  const canRun = ep.method === 'GET';
                  return (
                    <div key={ep.id} className="api-endpoint">
                      <div className="api-endpoint-row">
                        <span className={methodClass(ep.method)}>{ep.method}</span>
                        <code className="api-path">
                          {ep.path.split('/').map((seg, i) =>
                            seg.startsWith('{')
                              ? <span key={i} className="api-path-param">/{seg}</span>
                              : <span key={i}>/{seg}</span>
                          ).slice(1)}
                        </code>
                        <span className="api-desc">{ep.description}</span>
                        <div className="api-actions">
                          {canRun && ep.paramKey && (
                            <input
                              className="param-input"
                              placeholder={ep.paramKey === 'name' ? 'name…' : 'id…'}
                              value={st.paramValue}
                              onChange={e => setEpState(ep.id, { paramValue: e.target.value })}
                            />
                          )}
                          {canRun ? (
                            <button
                              className="btn-run"
                              disabled={st.loading}
                              onClick={() => execute(ep)}
                            >
                              {st.loading ? '…' : '▶ Run'}
                            </button>
                          ) : (
                            <span className="api-no-run">
                              {ep.method === 'POST' ? '📝 Body required' : '⚠ Destructive'}
                            </span>
                          )}
                        </div>
                      </div>

                      {ep.bodyHint && (
                        <div className="api-body-hint">
                          <span className="hint-label">Request body:</span>
                          <code>{ep.bodyHint}</code>
                        </div>
                      )}

                      {st.open && (
                        <div className="response-panel">
                          <div className="response-meta">
                            {st.status !== null && (
                              <span className={`response-status ${statusClass(st.status)}`}>
                                {st.status}
                              </span>
                            )}
                            {st.time !== null && (
                              <span className="response-time">{st.time} ms</span>
                            )}
                            {st.error && !st.data && (
                              <span className="response-error">{st.error}</span>
                            )}
                            <button
                              className="response-close"
                              onClick={() => setEpState(ep.id, { open: false })}
                            >
                              ✕
                            </button>
                          </div>
                          {st.loading ? (
                            <div className="response-loading">Fetching…</div>
                          ) : (
                            <pre className="json-pre">
                              {st.data !== null
                                ? JSON.stringify(st.data, null, 2)
                                : st.error ?? 'No response body'}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}