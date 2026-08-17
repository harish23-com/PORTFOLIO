import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox, FolderKanban, Award, Download, Eye, Mail } from 'lucide-react';
import api from '../api/axios';
import { Card } from './ui';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-2xl p-4 sm:p-6 border transition-all"
    style={{ borderColor: 'var(--color-border)' }}
  >
    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4 ${color}`}>
      <Icon size={18} className="text-white" />
    </div>
    <p className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{value}</p>
    <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{label}</p>
  </motion.div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/analytics').then((res) => setData(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Dashboard</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Overview of your live portfolio traffic and engagement</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 mb-6 sm:mb-8">
        <StatCard icon={Eye} label="Total Visitors" value={data?.visitorCount ?? '0'} color="bg-gradient-to-br from-accent to-accent2" />
        <StatCard icon={Inbox} label="Contact Messages" value={data?.totalMessages ?? '0'} color="bg-gradient-to-br from-blue-500 to-cyan-400" />
        <StatCard icon={Mail} label="Unread Messages" value={data?.unreadMessages ?? '0'} color="bg-gradient-to-br from-orange-500 to-amber-400" />
        <StatCard icon={FolderKanban} label="Projects" value={data?.totalProjects ?? '0'} color="bg-gradient-to-br from-purple-500 to-pink-400" />
        <StatCard icon={Award} label="Certificates" value={data?.totalCertificates ?? '0'} color="bg-gradient-to-br from-emerald-500 to-teal-400" />
        <StatCard icon={Download} label="Resume Downloads" value={data?.resumeDownloads ?? '0'} color="bg-gradient-to-br from-rose-500 to-red-400" />
      </div>

      <Card title="Recent Messages">
        {data?.recentMessages?.length ? (
          <div className="space-y-2.5">
            {data.recentMessages.map((m) => (
              <div
                key={m._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 p-3 rounded-xl glass border"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>{m.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-muted)' }}>{m.subject || 'No subject'}</p>
                </div>
                <span className="text-[11px] flex-shrink-0" style={{ color: 'var(--color-muted)' }}>
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm" style={{ color: 'var(--color-muted)' }}>No messages received yet.</p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
