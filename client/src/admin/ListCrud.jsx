import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, Pencil, X, Save } from 'lucide-react';
import api from '../api/axios';
import { Card, Button } from './ui';

const ListCrud = ({ title, endpoint, emptyItem, fields, renderTitle, renderSubtitle }) => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get(endpoint).then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, [endpoint]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing._id) {
        await api.put(`${endpoint}/${editing._id}`, editing);
      } else {
        await api.post(endpoint, editing);
      }
      toast.success('Saved successfully');
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      toast.success('Deleted successfully');
      load();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const updateField = (key, value) => setEditing({ ...editing, [key]: value });

  const renderField = (field) => {
    const value = editing[field.key] ?? (field.type === 'array' ? [] : '');
    if (field.type === 'textarea') {
      return (
        <textarea
          key={field.key}
          placeholder={field.label}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60 mb-3"
          value={value}
          onChange={(e) => updateField(field.key, e.target.value)}
        />
      );
    }
    if (field.type === 'array') {
      return (
        <div key={field.key} className="mb-3">
          <label className="block text-xs text-muted mb-1.5">{field.label} (one per line)</label>
          <textarea
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60"
            value={(value || []).join('\n')}
            onChange={(e) => updateField(field.key, e.target.value.split('\n'))}
          />
        </div>
      );
    }
    if (field.type === 'select') {
      return (
        <select
          key={field.key}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60 mb-3"
          value={value}
          onChange={(e) => updateField(field.key, e.target.value)}
        >
          <option value="">Select {field.label}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    if (field.type === 'checkbox') {
      return (
        <label key={field.key} className="flex items-center gap-2 mb-3 text-sm text-muted">
          <input type="checkbox" checked={!!value} onChange={(e) => updateField(field.key, e.target.checked)} />
          {field.label}
        </label>
      );
    }
    return (
      <input
        key={field.key}
        type={field.type === 'number' ? 'number' : 'text'}
        placeholder={field.label}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60 mb-3"
        value={value}
        onChange={(e) => updateField(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
      />
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={() => setEditing({ ...emptyItem })}>
          <Plus size={16} /> Add New
        </Button>
      </div>

      {editing && (
        <Card title={editing._id ? 'Edit Item' : 'New Item'} actions={<button onClick={() => setEditing(null)} className="text-muted hover:text-white"><X size={18} /></button>}>
          {fields.map(renderField)}
          <Button onClick={handleSave} disabled={saving}>
            <Save size={14} /> {saving ? 'Saving...' : 'Save'}
          </Button>
        </Card>
      )}

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-muted text-sm">No items yet. Click "Add New" to create one.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="glass rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{renderTitle(item)}</p>
                {renderSubtitle && <p className="text-xs text-muted mt-0.5 truncate">{renderSubtitle(item)}</p>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="secondary" onClick={() => setEditing(item)}>
                  <Pencil size={14} />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListCrud;
