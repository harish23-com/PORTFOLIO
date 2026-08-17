import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2, Pencil, Save } from 'lucide-react';
import api from '../api/axios';
import { Button, Modal, ConfirmModal, LoadingCard } from './ui';

const ListCrud = ({ title, endpoint, emptyItem, fields, renderTitle, renderSubtitle }) => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get(endpoint).then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, [endpoint]);

  const handleSave = async (e) => {
    e?.preventDefault();
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

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await api.delete(`${endpoint}/${deletingId}`);
      toast.success('Deleted successfully');
      setDeletingId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  const updateField = (key, value) => setEditing({ ...editing, [key]: value });

  const renderField = (field) => {
    const value = editing?.[field.key] ?? (field.type === 'array' ? [] : '');
    if (field.type === 'textarea') {
      return (
        <div key={field.key} className="col-span-full mb-3.5">
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
            {field.label}
          </label>
          <textarea
            placeholder={field.label}
            rows={3}
            className="w-full rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors resize-y"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              color: 'var(--color-text)',
            }}
            value={value}
            onChange={(e) => updateField(field.key, e.target.value)}
          />
        </div>
      );
    }
    if (field.type === 'array') {
      return (
        <div key={field.key} className="col-span-full mb-3.5">
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
            {field.label} (one per line)
          </label>
          <textarea
            rows={3}
            className="w-full rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors resize-y"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              color: 'var(--color-text)',
            }}
            value={(value || []).join('\n')}
            onChange={(e) => updateField(field.key, e.target.value.split('\n'))}
          />
        </div>
      );
    }
    if (field.type === 'select') {
      return (
        <div key={field.key} className="mb-3.5">
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
            {field.label}
          </label>
          <select
            className="w-full rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              color: 'var(--color-text)',
            }}
            value={value}
            onChange={(e) => updateField(field.key, e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }
    if (field.type === 'checkbox') {
      return (
        <div key={field.key} className="col-span-full mb-3.5">
          <label className="inline-flex items-center gap-2.5 text-sm cursor-pointer select-none" style={{ color: 'var(--color-text)' }}>
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => updateField(field.key, e.target.checked)}
              className="w-4 h-4 rounded text-[var(--accent)] cursor-pointer"
            />
            <span className="font-medium text-xs sm:text-sm">{field.label}</span>
          </label>
        </div>
      );
    }
    return (
      <div key={field.key} className="mb-3.5">
        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
          {field.label}
        </label>
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          placeholder={field.label}
          className="w-full rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors"
          style={{
            background: 'var(--input-bg)',
            border: '1px solid var(--input-border)',
            color: 'var(--color-text)',
          }}
          value={value}
          onChange={(e) => updateField(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{title}</h1>
          <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Manage and reorder your {title.toLowerCase()}</p>
        </div>
        <Button onClick={() => setEditing({ ...emptyItem })} className="w-full sm:w-auto">
          <Plus size={16} /> Add New
        </Button>
      </div>

      <Modal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title={editing?._id ? `Edit ${title.replace(/s$/, '')}` : `Add New ${title.replace(/s$/, '')}`}
        maxWidth="max-w-2xl"
      >
        {editing && (
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              {fields.map(renderField)}
            </div>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-4 mt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <Button type="button" variant="secondary" onClick={() => setEditing(null)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                <Save size={14} /> {saving ? 'Saving...' : 'Save Item'}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        title={`Delete ${title.replace(/s$/, '')}`}
        message={`Are you sure you want to delete this ${title.replace(/s$/, '').toLowerCase()}? This action cannot be undone.`}
      />

      {loading ? (
        <LoadingCard text={`Loading ${title.toLowerCase()}...`} />
      ) : items.length === 0 ? (
        <div className="p-8 text-center glass rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>No items yet. Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="space-y-2.5 sm:space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="glass rounded-2xl p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 transition-all"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate" style={{ color: 'var(--color-text)' }}>{renderTitle(item)}</p>
                {renderSubtitle && (
                  <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-muted)' }}>{renderSubtitle(item)}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="secondary" onClick={() => setEditing(item)} className="px-3 py-2 sm:px-3.5 sm:py-2" aria-label="Edit item">
                  <Pencil size={13} />
                </Button>
                <Button variant="danger" onClick={() => setDeletingId(item._id)} className="px-3 py-2 sm:px-3.5 sm:py-2" aria-label="Delete item">
                  <Trash2 size={13} />
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
