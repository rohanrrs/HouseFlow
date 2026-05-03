import { useState, useEffect, useCallback } from 'react';
import Modal from './Modal';
import type { FormField } from '../types';

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface ResourcePageProps<T extends { id: number }> {
  title: string;
  subtitle: string;
  columns: Column<T>[];
  formFields: FormField[];
  emptyForm: Record<string, string | number>;
  fetchAll: () => Promise<T[]>;
  create: (data: Record<string, string | number>) => Promise<T>;
  remove: (id: number) => Promise<void>;
}

export default function ResourcePage<T extends { id: number }>({
  title,
  subtitle,
  columns,
  formFields,
  emptyForm,
  fetchAll,
  create,
  remove,
}: ResourcePageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Record<string, string | number>>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setItems(await fetchAll());
    } catch {
      setError('Failed to load data. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  useEffect(() => { load(); }, [load]);

  const openModal = () => { setForm(emptyForm); setShowModal(true); };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await create(form);
      setShowModal(false);
      await load();
    } catch {
      setError('Failed to create record. Check all fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this record? This cannot be undone.')) return;
    try {
      setError(null);
      await remove(id);
      await load();
    } catch {
      setError('Failed to delete record.');
    }
  };

  const setField = (key: string, value: string | number) =>
    setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-text">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <button className="btn btn-primary" onClick={openModal}>
          + New {title.replace(/s$/, '')}
        </button>
      </div>

      {error && <div className="error-bar">{error}</div>}

      <div className="card">
        {loading ? (
          <div className="state">
            <div className="state-icon">⏳</div>
            <p>Loading...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="state">
            <div className="state-icon">📭</div>
            <p>No records yet. Click <strong>+ New</strong> to add one.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {columns.map(c => <th key={c.key}>{c.label}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    {columns.map(col => (
                      <td key={col.key}>
                        {col.render
                          ? col.render(item)
                          : String((item as Record<string, unknown>)[col.key] ?? '—')}
                      </td>
                    ))}
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <Modal
          title={`New ${title.replace(/s$/, '')}`}
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Saving…' : 'Save'}
              </button>
            </>
          }
        >
          <div className="form-grid">
            {formFields.map(field => (
              <div key={field.key} className={`form-group${field.fullWidth ? ' full' : ''}`}>
                <label>{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={form[field.key] ?? ''}
                    onChange={e => setField(field.key, e.target.value)}
                  >
                    <option value="">— Select —</option>
                    {field.options?.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    step={field.step}
                    value={form[field.key] ?? ''}
                    onChange={e =>
                      setField(
                        field.key,
                        field.type === 'number' ? Number(e.target.value) : e.target.value
                      )
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}