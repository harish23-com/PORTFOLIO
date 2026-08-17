import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Send, Mail, MailOpen, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import { Button, ConfirmModal, LoadingCard } from './ui';

const MessagesEditor = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get('/contact')
      .then((res) => setMessages(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openMessage = async (msg) => {
    const { data } = await api.get(`/contact/${msg._id}`);
    setSelected(data.data);
    load();
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await api.delete(`/contact/${deletingId}`);
      toast.success('Message deleted');
      if (selected?._id === deletingId) setSelected(null);
      setDeletingId(null);
      load();
    } catch {
      toast.error('Failed to delete message');
    } finally {
      setDeleting(false);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      await api.post(`/contact/${selected._id}/reply`, { replyText: reply });
      toast.success('Reply sent successfully');
      setReply('');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reply. Please configure SMTP first.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Contact Messages</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Read visitor inquiries and send direct email replies</p>
      </div>

      <ConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
        <div className={`lg:col-span-2 space-y-2.5 ${selected ? 'hidden lg:block' : 'block'}`}>
          {loading ? (
            <LoadingCard text="Loading messages..." />
          ) : messages.length === 0 ? (
            <div className="p-8 text-center glass rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>No messages received yet.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => openMessage(msg)}
                className={`w-full text-left glass rounded-2xl p-3.5 sm:p-4 transition-all ${
                  selected?._id === msg._id ? 'border-accent' : ''
                }`}
                style={{
                  borderColor: selected?._id === msg._id ? 'var(--accent)' : 'var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold flex items-center gap-2 truncate" style={{ color: 'var(--color-text)' }}>
                    {msg.isRead ? (
                      <MailOpen size={14} className="flex-shrink-0" style={{ color: 'var(--color-muted)' }} />
                    ) : (
                      <Mail size={14} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                    )}
                    <span className="truncate">{msg.name}</span>
                  </p>
                  <span className="text-[11px] flex-shrink-0" style={{ color: 'var(--color-muted)' }}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs truncate font-medium" style={{ color: 'var(--color-text)' }}>
                  {msg.subject || 'No Subject'}
                </p>
                <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-muted)' }}>
                  {msg.message}
                </p>
              </button>
            ))
          )}
        </div>

        <div className={`lg:col-span-3 ${selected ? 'block' : 'hidden lg:block'}`}>
          {selected ? (
            <div className="glass rounded-2xl p-4 sm:p-6 border" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    onClick={() => setSelected(null)}
                    className="lg:hidden w-8 h-8 rounded-full glass flex items-center justify-center flex-shrink-0"
                    style={{ color: 'var(--color-text)' }}
                    aria-label="Back to messages"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="min-w-0">
                    <h2 className="font-bold text-base sm:text-lg break-words" style={{ color: 'var(--color-text)' }}>
                      {selected.subject || 'Inquiry'}
                    </h2>
                    <p className="text-xs mt-0.5 break-all" style={{ color: 'var(--color-muted)' }}>
                      From: <span className="font-medium" style={{ color: 'var(--color-text)' }}>{selected.name}</span> ({selected.email})
                      {selected.phone && ` · ${selected.phone}`}
                    </p>
                  </div>
                </div>
                <Button variant="danger" onClick={() => setDeletingId(selected._id)} className="px-3 py-2 flex-shrink-0">
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl mb-6 bg-white/[0.02] border border-white/5">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent2)' }}>
                  Message Content
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words" style={{ color: 'var(--color-text)' }}>
                  {selected.message}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
                  Reply to {selected.name} ({selected.email})
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl px-3.5 sm:px-4 py-2.5 text-sm outline-none transition-colors mb-3 resize-y"
                  style={{
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--color-text)',
                  }}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply message..."
                />
                <div className="flex flex-wrap gap-2.5">
                  <Button onClick={handleReply} disabled={sending || !reply.trim()} className="w-full sm:w-auto">
                    <Send size={14} /> {sending ? 'Sending...' : 'Send Email Reply'}
                  </Button>
                  <Button variant="secondary" onClick={() => setSelected(null)} className="w-full sm:w-auto lg:hidden">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center glass rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
              <Mail size={32} className="mx-auto mb-3 opacity-40" style={{ color: 'var(--color-muted)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Select a message</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Choose any message on the left to read and reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesEditor;
