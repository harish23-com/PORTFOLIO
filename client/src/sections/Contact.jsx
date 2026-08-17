import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = ({ about }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message should be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'var(--input-bg)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.6)' : 'var(--input-border)'}`,
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    outline: 'none',
    color: 'var(--color-text)',
    transition: 'border-color 0.2s ease',
  });

  const contactInfoItems = [
    { show: about?.personalInfo?.email, icon: Mail, label: 'Email', value: about?.personalInfo?.email },
    { show: about?.personalInfo?.phone, icon: Phone, label: 'Phone', value: about?.personalInfo?.phone },
    { show: about?.personalInfo?.location, icon: MapPin, label: 'Location', value: about?.personalInfo?.location },
  ].filter((i) => i.show);

  return (
    <section id="contact" className="py-20 sm:py-28 relative" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="section-container">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12 sm:mb-16">
          <p className="section-heading-badge">Let's talk</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-text)' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="lg:col-span-2 flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4">
            {contactInfoItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-4 flex-1 lg:flex-none">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
                >
                  <Icon size={16} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{label}</p>
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-3xl p-5 sm:p-8 space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  style={inputStyle('name')}
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={(e) => { if (!errors.name) e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.6)' : 'var(--input-border)'; }}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  style={inputStyle('email')}
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={(e) => { if (!errors.email) e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.6)' : 'var(--input-border)'; }}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  style={inputStyle('phone')}
                  placeholder="Phone (optional)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--input-border)'; }}
                />
              </div>
              <div>
                <input
                  style={inputStyle('subject')}
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  onFocus={(e) => { if (!errors.subject) e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.subject ? 'rgba(239,68,68,0.6)' : 'var(--input-border)'; }}
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
              </div>
            </div>

            <div>
              <textarea
                style={{ ...inputStyle('message'), resize: 'vertical' }}
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={(e) => { if (!errors.message) e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
                onBlur={(e) => { e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.6)' : 'var(--input-border)'; }}
              />
              {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-60">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
