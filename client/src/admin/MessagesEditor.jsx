import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Send, Mail, MailOpen } from 'lucide-react';
import api from '../api/axios';
import { Button } from './ui';

const MessagesEditor = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);

  const load = () => api.get('/contact').then((res) => setMessages(res.data.data));

  useEffect(() => { load(); }, []);

  const openMessage = async (msg) => {
    const { data } = await api.get(`/contact/${msg._id}`);
    setSelected(data.data);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await api.delete(`/contact/${id}`);
    toast.success('Deleted');
    setSelected(null);
    load();
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    try {
      await api.post(`/contact/${selected._id}/reply`, { replyText: reply });
      toast.success('Reply sent');
      setReply('');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reply. Configure SMTP first.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-2">
          {messages.length === 0 && <p className="text-muted text-sm">No messages yet.</p>}
          {messages.map((msg) => (
            <button
              key={msg._id}
              onClick={() => openMessage(msg)}
              className={`w-full text-left glass rounded-xl p-4 transition-colors ${selected?._id === msg._id ? 'border-accent/50' : ''}`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium flex items-center gap-2">
                  {msg.isRead ? <MailOpen size={13} className="text-muted" /> : <Mail size={13} className="text-accent" />}
                  {msg.name}
                </p>
                <p className="text-[11px] text-muted">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-xs text-muted truncate">{msg.subject}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold">{selected.subject}</p>
                  <p className="text-xs text-muted mt-1">{selected.name} · {selected.email} {selected.phone && `· ${selected.phone}`}</p>
                </div>
                <Button variant="danger" onClick={() => handleDelete(selected._id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
              <p className="text-sm text-muted leading-relaxed border-t border-white/5 pt-4">{selected.message}</p>

              <div className="mt-6">
                <label className="block text-xs text-muted mb-1.5">Reply</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60 mb-3"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                />
                <Button onClick={handleReply} disabled={sending}>
                  <Send size={14} /> {sending ? 'Sending...' : 'Send Reply'}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted text-sm">Select a message to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesEditor;
