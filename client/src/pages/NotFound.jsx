import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-grid-glow text-center px-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <p className="text-8xl font-display font-bold gradient-text mb-4">404</p>
      <p className="text-muted mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">
        <HomeIcon size={16} /> Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
