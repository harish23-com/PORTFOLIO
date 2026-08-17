import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Certificates from '../sections/Certificates';
import Resume from '../sections/Resume';
import Contact from '../sections/Contact';

const Home = () => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [hero, about, skills, projects, experience, education, certificates, socialLinks, settings] = await Promise.all([
          api.get('/hero'),
          api.get('/about'),
          api.get('/skills'),
          api.get('/projects'),
          api.get('/experience'),
          api.get('/education'),
          api.get('/certificates'),
          api.get('/social-links'),
          api.get('/settings'),
        ]);

        setData({
          hero: hero.data.data,
          about: about.data.data,
          skills: skills.data.data,
          projects: projects.data.data,
          experience: experience.data.data,
          education: education.data.data,
          certificates: certificates.data.data,
          socialLinks: socialLinks.data.data,
          settings: settings.data.data,
        });

        api.post('/analytics/track-visit').catch(() => { });
      } catch (err) {
        console.error('Failed to load portfolio data', err);
      } finally {
        setLoaded(true);
      }
    };
    fetchAll();
  }, []);

  if (!loaded) return null;

  return (
    <>
      <Helmet>
        <title>{data.settings?.seo?.metaTitle || data.settings?.siteName || 'Portfolio'}</title>
        <meta name="description" content={data.settings?.seo?.metaDescription || ''} />
        <meta name="keywords" content={data.settings?.seo?.keywords || ''} />
        <meta name="robots" content={data.settings?.seo?.robots || 'index, follow'} />
      </Helmet>

      <Navbar siteName={data.settings?.siteName} />
      <Hero hero={data.hero} />
      <About about={data.about} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Experience experience={data.experience} />
      <Education education={data.education} />
      <Certificates certificates={data.certificates} />
      <Resume hero={data.hero} />
      <Contact about={data.about} />
      <Footer settings={data.settings} socialLinks={data.socialLinks} />
    </>
  );
};

export default Home;
