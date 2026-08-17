import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox, FolderKanban, Award, Download, Eye, Mail } from 'lucide-react';
import api from '../api/axios';
import { Card } from './ui';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-xs text-muted mt-1">{label}</p>
  </motion.div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/analytics').then((res) => setData(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-muted text-sm mb-8">Overview of your portfolio activity</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard icon={Eye} label="Total Visitors" value={data?.visitorCount ?? '-'} color="bg-gradient-to-br from-accent to-accent2" />
        <StatCard icon={Inbox} label="Contact Messages" value={data?.totalMessages ?? '-'} color="bg-gradient-to-br from-blue-500 to-cyan-400" />
        <StatCard icon={Mail} label="Unread Messages" value={data?.unreadMessages ?? '-'} color="bg-gradient-to-br from-orange-500 to-amber-400" />
        <StatCard icon={FolderKanban} label="Projects" value={data?.totalProjects ?? '-'} color="bg-gradient-to-br from-purple-500 to-pink-400" />
        <StatCard icon={Award} label="Certificates" value={data?.totalCertificates ?? '-'} color="bg-gradient-to-br from-emerald-500 to-teal-400" />
        <StatCard icon={Download} label="Resume Downloads" value={data?.resumeDownloads ?? '-'} color="bg-gradient-to-br from-rose-500 to-red-400" />
      </div>

      <Card title="Recent Messages">
        {data?.recentMessages?.length ? (
          <div className="space-y-3">
            {data.recentMessages.map((m) => (
              <div key={m._id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted">{m.subject}</p>
                </div>
                <p className="text-xs text-muted">{new Date(m.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No messages yet.</p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
